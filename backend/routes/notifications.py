"""
Notifications API Routes for Medikal Healthcare System
Handles patient notifications, medication reminders, and alerts
"""
from fastapi import APIRouter, HTTPException, Depends, Query
from typing import List, Dict, Any, Optional
from datetime import datetime, timedelta
from pydantic import BaseModel
from server import db, get_current_user
from bson import ObjectId

router = APIRouter(prefix="/notifications", tags=["notifications"])


class NotificationCreate(BaseModel):
    patient_id: str
    type: str  # appointment, medication, lab_result, ai_insight, system
    title: str
    message: str
    priority: str = "medium"  # low, medium, high
    action_url: Optional[str] = None


class NotificationResponse(BaseModel):
    id: str
    patient_id: str
    type: str
    title: str
    message: str
    priority: str
    timestamp: str
    read: bool
    action_url: Optional[str] = None


def generate_sample_notifications(patient_id: str) -> List[Dict[str, Any]]:
    """Generate sample notifications for demo purposes"""
    now = datetime.utcnow()
    
    notifications = [
        {
            "id": f"notif_{patient_id}_1",
            "patient_id": patient_id,
            "type": "medication",
            "title": "Medication Reminder",
            "message": "Time to take your Amoxicillin 500mg (2:00 PM dose)",
            "priority": "high",
            "timestamp": (now - timedelta(hours=1)).isoformat(),
            "read": False,
            "action_url": "/patient/reminders"
        },
        {
            "id": f"notif_{patient_id}_2",
            "patient_id": patient_id,
            "type": "appointment",
            "title": "Upcoming Appointment",
            "message": "Follow-up visit with Dr. Sarah Johnson tomorrow at 10:00 AM",
            "priority": "high",
            "timestamp": (now - timedelta(hours=3)).isoformat(),
            "read": False,
            "action_url": "/patient/appointments"
        },
        {
            "id": f"notif_{patient_id}_3",
            "patient_id": patient_id,
            "type": "lab_result",
            "title": "Lab Results Available",
            "message": "Your blood test results from yesterday are now ready for review",
            "priority": "medium",
            "timestamp": (now - timedelta(hours=6)).isoformat(),
            "read": True,
            "action_url": "/patient/lab-results"
        },
        {
            "id": f"notif_{patient_id}_4",
            "patient_id": patient_id,
            "type": "ai_insight",
            "title": "Health Insight",
            "message": "Based on your medication history, consider discussing antibiotic alternatives with your doctor at your next visit",
            "priority": "medium",
            "timestamp": (now - timedelta(days=1)).isoformat(),
            "read": False,
            "action_url": None
        },
        {
            "id": f"notif_{patient_id}_5",
            "patient_id": patient_id,
            "type": "medication",
            "title": "Prescription Refill Needed",
            "message": "Your Paracetamol prescription will run out in 3 days. Request a refill soon.",
            "priority": "medium",
            "timestamp": (now - timedelta(days=1, hours=5)).isoformat(),
            "read": True,
            "action_url": "/patient/prescriptions"
        },
        {
            "id": f"notif_{patient_id}_6",
            "patient_id": patient_id,
            "type": "appointment",
            "title": "Appointment Confirmed",
            "message": "Your appointment with Dr. Michael Brown on January 25th has been confirmed",
            "priority": "low",
            "timestamp": (now - timedelta(days=2)).isoformat(),
            "read": True,
            "action_url": "/patient/appointments"
        },
        {
            "id": f"notif_{patient_id}_7",
            "patient_id": patient_id,
            "type": "lab_result",
            "title": "AMR Alert - Culture Results",
            "message": "Your recent culture test shows antibiotic resistance. Your doctor has been notified and may adjust your treatment.",
            "priority": "high",
            "timestamp": (now - timedelta(days=3)).isoformat(),
            "read": False,
            "action_url": "/patient/lab-results"
        },
        {
            "id": f"notif_{patient_id}_8",
            "patient_id": patient_id,
            "type": "system",
            "title": "Profile Update Needed",
            "message": "Please update your emergency contact information in your profile settings",
            "priority": "low",
            "timestamp": (now - timedelta(days=5)).isoformat(),
            "read": True,
            "action_url": "/patient/profile"
        }
    ]
    
    return notifications


@router.get("")
async def get_notifications(
    patient_id: Optional[str] = Query(None, description="Filter by patient ID"),
    status: Optional[str] = Query(None, description="Filter by status: read, unread"),
    type: Optional[str] = Query(None, description="Filter by type: appointment, medication, lab_result, ai_insight, system"),
    limit: int = Query(20, description="Maximum number of notifications to return"),
    current_user: dict = Depends(get_current_user)
):
    """
    Get notifications for the current user or specific patient
    """
    try:
        # Use patient_id if provided, otherwise use current user's associated patient
        target_patient_id = patient_id or str(current_user.get("_id", "default"))
        
        # Generate sample notifications (in production, fetch from database)
        notifications = generate_sample_notifications(target_patient_id)
        
        # Apply filters
        if status == "read":
            notifications = [n for n in notifications if n["read"]]
        elif status == "unread":
            notifications = [n for n in notifications if not n["read"]]
        
        if type:
            notifications = [n for n in notifications if n["type"] == type]
        
        # Sort by timestamp (newest first)
        notifications.sort(key=lambda x: x["timestamp"], reverse=True)
        
        # Apply limit
        notifications = notifications[:limit]
        
        # Calculate statistics
        all_notifications = generate_sample_notifications(target_patient_id)
        stats = {
            "total": len(all_notifications),
            "unread": sum(1 for n in all_notifications if not n["read"]),
            "high_priority": sum(1 for n in all_notifications if n["priority"] == "high" and not n["read"]),
            "by_type": {
                "appointment": sum(1 for n in all_notifications if n["type"] == "appointment"),
                "medication": sum(1 for n in all_notifications if n["type"] == "medication"),
                "lab_result": sum(1 for n in all_notifications if n["type"] == "lab_result"),
                "ai_insight": sum(1 for n in all_notifications if n["type"] == "ai_insight"),
                "system": sum(1 for n in all_notifications if n["type"] == "system")
            }
        }
        
        return {
            "notifications": notifications,
            "statistics": stats
        }
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error fetching notifications: {str(e)}")


@router.post("")
async def create_notification(
    notification: NotificationCreate,
    current_user: dict = Depends(get_current_user)
):
    """
    Create a new notification
    """
    try:
        notif_doc = {
            "patient_id": notification.patient_id,
            "type": notification.type,
            "title": notification.title,
            "message": notification.message,
            "priority": notification.priority,
            "timestamp": datetime.utcnow(),
            "read": False,
            "action_url": notification.action_url,
            "created_by": str(current_user["_id"]),
            "created_at": datetime.utcnow()
        }
        
        result = await db.notifications.insert_one(notif_doc)
        
        return {
            "message": "Notification created successfully",
            "notification_id": str(result.inserted_id)
        }
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error creating notification: {str(e)}")


@router.put("/{notification_id}/read")
async def mark_notification_read(
    notification_id: str,
    current_user: dict = Depends(get_current_user)
):
    """
    Mark a notification as read
    """
    try:
        # In production, update in database
        # For demo, return success
        return {
            "message": "Notification marked as read",
            "notification_id": notification_id
        }
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error marking notification as read: {str(e)}")


@router.put("/mark-all-read")
async def mark_all_notifications_read(
    patient_id: Optional[str] = Query(None, description="Patient ID to mark all as read"),
    current_user: dict = Depends(get_current_user)
):
    """
    Mark all notifications as read for a patient
    """
    try:
        target_patient_id = patient_id or str(current_user.get("_id", "default"))
        
        # In production, update all in database
        # For demo, return success
        return {
            "message": "All notifications marked as read",
            "patient_id": target_patient_id
        }
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error marking all notifications as read: {str(e)}")


@router.delete("/{notification_id}")
async def delete_notification(
    notification_id: str,
    current_user: dict = Depends(get_current_user)
):
    """
    Delete a notification
    """
    try:
        # In production, delete from database
        # For demo, return success
        return {
            "message": "Notification deleted successfully",
            "notification_id": notification_id
        }
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error deleting notification: {str(e)}")


@router.get("/medication-reminders/{patient_id}")
async def get_medication_reminders(
    patient_id: str,
    current_user: dict = Depends(get_current_user)
):
    """
    Get medication reminders for a patient
    """
    try:
        now = datetime.utcnow()
        
        # Sample medication reminders
        reminders = [
            {
                "id": "rem_1",
                "patient_id": patient_id,
                "medication_name": "Amoxicillin 500mg",
                "dosage": "1 tablet",
                "frequency": "3 times daily",
                "times": ["08:00", "14:00", "20:00"],
                "next_dose": "14:00",
                "last_taken": (now - timedelta(hours=6)).isoformat(),
                "remaining_doses": 15,
                "end_date": (now + timedelta(days=5)).strftime("%Y-%m-%d"),
                "instructions": "Take with food. Complete full course.",
                "priority": "high",
                "is_antibiotic": True
            },
            {
                "id": "rem_2",
                "patient_id": patient_id,
                "medication_name": "Paracetamol 500mg",
                "dosage": "1-2 tablets",
                "frequency": "As needed (max 4x daily)",
                "times": [],
                "next_dose": None,
                "last_taken": (now - timedelta(hours=12)).isoformat(),
                "remaining_doses": 20,
                "end_date": None,
                "instructions": "For fever and pain. Do not exceed 4g/day.",
                "priority": "medium",
                "is_antibiotic": False
            },
            {
                "id": "rem_3",
                "patient_id": patient_id,
                "medication_name": "Omeprazole 20mg",
                "dosage": "1 capsule",
                "frequency": "Once daily",
                "times": ["07:00"],
                "next_dose": "07:00 tomorrow",
                "last_taken": (now - timedelta(hours=10)).isoformat(),
                "remaining_doses": 10,
                "end_date": (now + timedelta(days=10)).strftime("%Y-%m-%d"),
                "instructions": "Take 30 minutes before breakfast.",
                "priority": "medium",
                "is_antibiotic": False
            }
        ]
        
        # Calculate adherence statistics
        adherence_stats = {
            "total_doses_scheduled": 45,
            "doses_taken": 42,
            "doses_missed": 3,
            "adherence_rate": 93.3,
            "streak_days": 5,
            "antibiotics_adherence": 100
        }
        
        return {
            "patient_id": patient_id,
            "reminders": reminders,
            "adherence_statistics": adherence_stats,
            "amr_message": "Important: Complete your full antibiotic course to prevent resistance development."
        }
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error fetching medication reminders: {str(e)}")
