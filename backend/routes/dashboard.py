"""
Dashboard Metrics API Routes for Medikal Healthcare System
Provides analytics and KPIs for AMR surveillance and clinical operations
"""
from fastapi import APIRouter, HTTPException, Depends, Query
from typing import List, Dict, Any, Optional
from datetime import datetime, timedelta
from pydantic import BaseModel
from server import db, get_current_user
import random

router = APIRouter(prefix="/dashboard", tags=["dashboard"])


class MetricsResponse(BaseModel):
    timestamp: str
    period: str
    metrics: Dict[str, Any]


def generate_trend_data(days: int = 30) -> List[Dict[str, Any]]:
    """Generate sample trend data for charts"""
    base_date = datetime.utcnow()
    trends = []
    
    for i in range(days, 0, -1):
        date = base_date - timedelta(days=i)
        trends.append({
            "date": date.strftime("%Y-%m-%d"),
            "prescriptions": random.randint(25, 45),
            "antibiotic_prescriptions": random.randint(8, 18),
            "resistance_cases": random.randint(2, 8),
            "patient_visits": random.randint(40, 70)
        })
    
    return trends


@router.get("/metrics")
async def get_dashboard_metrics(
    period: str = Query("30d", description="Time period: 7d, 30d, 90d"),
    current_user: dict = Depends(get_current_user)
):
    """
    Get comprehensive dashboard metrics including AMR statistics
    """
    try:
        # Calculate period in days
        period_days = {"7d": 7, "30d": 30, "90d": 90}.get(period, 30)
        
        # In production, fetch real data from database
        # For demo, return sample metrics
        metrics = {
            "timestamp": datetime.utcnow().isoformat(),
            "period": period,
            "overview": {
                "total_patients": 1247,
                "active_cases": 89,
                "prescriptions_today": 34,
                "pending_lab_results": 12
            },
            "amr_metrics": {
                "total_cultures_ordered": 156,
                "resistance_cases_detected": 42,
                "resistance_rate_percent": 26.9,
                "trend": "increasing",
                "trend_change_percent": 3.2,
                "most_resistant_organism": "E. coli",
                "antibiotics_with_high_resistance": [
                    {"name": "Ampicillin", "resistance_rate": 78},
                    {"name": "TMP-SMX", "resistance_rate": 65},
                    {"name": "Penicillin", "resistance_rate": 92}
                ]
            },
            "prescription_analytics": {
                "total_prescriptions": 523,
                "antibiotic_prescriptions": 187,
                "antibiotic_rate_percent": 35.8,
                "who_aware_breakdown": {
                    "access": {"count": 127, "percent": 67.9},
                    "watch": {"count": 52, "percent": 27.8},
                    "reserve": {"count": 8, "percent": 4.3}
                },
                "top_prescribed_antibiotics": [
                    {"name": "Amoxicillin", "count": 45, "category": "Access"},
                    {"name": "Ciprofloxacin", "count": 32, "category": "Watch"},
                    {"name": "Azithromycin", "count": 28, "category": "Watch"},
                    {"name": "Metronidazole", "count": 24, "category": "Access"},
                    {"name": "Ceftriaxone", "count": 18, "category": "Watch"}
                ]
            },
            "patient_outcomes": {
                "treatment_success_rate": 87.3,
                "readmission_rate": 4.2,
                "average_treatment_duration_days": 5.8,
                "adverse_drug_reactions": 3
            },
            "operational_metrics": {
                "average_consultation_time_mins": 18,
                "lab_turnaround_time_hours": 24,
                "prescription_compliance_rate": 78.5,
                "patient_satisfaction_score": 4.2
            }
        }
        
        return metrics
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error fetching metrics: {str(e)}")


@router.get("/trends")
async def get_dashboard_trends(
    metric_type: str = Query("all", description="Type: prescriptions, amr, visits, all"),
    period: str = Query("30d", description="Time period: 7d, 30d, 90d"),
    current_user: dict = Depends(get_current_user)
):
    """
    Get trend data for dashboard charts
    """
    try:
        period_days = {"7d": 7, "30d": 30, "90d": 90}.get(period, 30)
        
        # Generate trend data
        trends = generate_trend_data(period_days)
        
        response = {
            "period": period,
            "data_points": len(trends),
            "trends": trends
        }
        
        # Calculate summary statistics
        if trends:
            response["summary"] = {
                "prescriptions": {
                    "total": sum(t["prescriptions"] for t in trends),
                    "average": sum(t["prescriptions"] for t in trends) / len(trends),
                    "max": max(t["prescriptions"] for t in trends),
                    "min": min(t["prescriptions"] for t in trends)
                },
                "antibiotic_prescriptions": {
                    "total": sum(t["antibiotic_prescriptions"] for t in trends),
                    "average": sum(t["antibiotic_prescriptions"] for t in trends) / len(trends),
                    "max": max(t["antibiotic_prescriptions"] for t in trends),
                    "min": min(t["antibiotic_prescriptions"] for t in trends)
                },
                "resistance_cases": {
                    "total": sum(t["resistance_cases"] for t in trends),
                    "average": sum(t["resistance_cases"] for t in trends) / len(trends),
                    "max": max(t["resistance_cases"] for t in trends),
                    "min": min(t["resistance_cases"] for t in trends)
                }
            }
        
        return response
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error fetching trends: {str(e)}")


@router.get("/amr-alerts")
async def get_amr_alerts(
    severity: Optional[str] = Query(None, description="Filter by severity: critical, high, medium, low"),
    current_user: dict = Depends(get_current_user)
):
    """
    Get active AMR alerts and recommendations
    """
    try:
        alerts = [
            {
                "id": "alert_001",
                "severity": "critical",
                "title": "ESBL-producing E. coli Outbreak Alert",
                "message": "3 cases of ESBL-producing E. coli detected in the past week. Consider enhanced infection control.",
                "recommendation": "Use Carbapenems for empirical therapy in severe infections. Send cultures before treatment.",
                "affected_ward": "Medicine Ward",
                "created_at": (datetime.utcnow() - timedelta(hours=6)).isoformat(),
                "acknowledged": False
            },
            {
                "id": "alert_002",
                "severity": "high",
                "title": "High Fluoroquinolone Usage",
                "message": "Ciprofloxacin prescriptions increased 40% this month. Review indication appropriateness.",
                "recommendation": "Consider Nitrofurantoin for uncomplicated UTIs. Reserve Ciprofloxacin for resistant organisms.",
                "affected_ward": "Outpatient",
                "created_at": (datetime.utcnow() - timedelta(days=2)).isoformat(),
                "acknowledged": True
            },
            {
                "id": "alert_003",
                "severity": "medium",
                "title": "Rising TMP-SMX Resistance",
                "message": "TMP-SMX resistance in E. coli now at 65%, up from 52% last quarter.",
                "recommendation": "Update empirical therapy guidelines for UTIs. Consider alternative first-line agents.",
                "affected_ward": "All",
                "created_at": (datetime.utcnow() - timedelta(days=5)).isoformat(),
                "acknowledged": False
            },
            {
                "id": "alert_004",
                "severity": "low",
                "title": "Antibiotic Stewardship Reminder",
                "message": "Monthly antibiotic stewardship meeting scheduled for next week.",
                "recommendation": "Review pending culture results and de-escalate therapy where appropriate.",
                "affected_ward": "All",
                "created_at": (datetime.utcnow() - timedelta(days=7)).isoformat(),
                "acknowledged": True
            }
        ]
        
        # Apply severity filter
        if severity:
            alerts = [a for a in alerts if a["severity"] == severity]
        
        return {
            "alerts": alerts,
            "total": len(alerts),
            "unacknowledged": sum(1 for a in alerts if not a["acknowledged"]),
            "critical_count": sum(1 for a in alerts if a["severity"] == "critical")
        }
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error fetching AMR alerts: {str(e)}")


@router.get("/who-aware-stats")
async def get_who_aware_statistics(
    period: str = Query("30d", description="Time period: 7d, 30d, 90d"),
    current_user: dict = Depends(get_current_user)
):
    """
    Get WHO AWaRe classification statistics for antibiotic stewardship
    """
    try:
        stats = {
            "period": period,
            "classification_breakdown": {
                "access": {
                    "description": "First-choice antibiotics for common infections",
                    "target_percent": 60,
                    "actual_percent": 67.9,
                    "status": "meeting_target",
                    "examples": ["Amoxicillin", "Metronidazole", "Doxycycline", "Nitrofurantoin"]
                },
                "watch": {
                    "description": "Higher resistance potential, use with caution",
                    "target_percent": 35,
                    "actual_percent": 27.8,
                    "status": "meeting_target",
                    "examples": ["Ciprofloxacin", "Azithromycin", "Ceftriaxone", "Vancomycin"]
                },
                "reserve": {
                    "description": "Last resort, preserve for MDR organisms",
                    "target_percent": 5,
                    "actual_percent": 4.3,
                    "status": "meeting_target",
                    "examples": ["Colistin", "Linezolid", "Tigecycline", "Daptomycin"]
                }
            },
            "trend_comparison": {
                "previous_period": {
                    "access": 64.2,
                    "watch": 31.5,
                    "reserve": 4.3
                },
                "current_period": {
                    "access": 67.9,
                    "watch": 27.8,
                    "reserve": 4.3
                },
                "improvement": True,
                "notes": "Access antibiotic use increased by 3.7%, indicating improved stewardship"
            },
            "prescriber_performance": [
                {"name": "Dr. Sarah Johnson", "access_rate": 72, "watch_rate": 24, "reserve_rate": 4, "compliance": "excellent"},
                {"name": "Dr. Michael Brown", "access_rate": 65, "watch_rate": 30, "reserve_rate": 5, "compliance": "good"},
                {"name": "Dr. Emily Davis", "access_rate": 58, "watch_rate": 38, "reserve_rate": 4, "compliance": "needs_improvement"}
            ]
        }
        
        return stats
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error fetching WHO AWaRe stats: {str(e)}")


@router.get("/regional-patterns")
async def get_regional_amr_patterns(
    current_user: dict = Depends(get_current_user)
):
    """
    Get regional AMR patterns (simulated for African context)
    """
    try:
        patterns = {
            "region": "East Africa - Rwanda",
            "reporting_facilities": 12,
            "data_period": "Last 90 days",
            "regional_resistance_rates": {
                "E. coli": {
                    "ampicillin": 82,
                    "tmp_smx": 68,
                    "ciprofloxacin": 22,
                    "ceftriaxone": 15,
                    "nitrofurantoin": 8
                },
                "S. aureus": {
                    "penicillin": 94,
                    "mrsa_rate": 24,
                    "clindamycin": 12,
                    "erythromycin": 28,
                    "vancomycin": 0
                },
                "K. pneumoniae": {
                    "ampicillin": 100,
                    "esbl_rate": 32,
                    "carbapenem_resistance": 8,
                    "aminoglycoside": 18
                }
            },
            "comparison_with_national": {
                "e_coli_ciprofloxacin": {"local": 22, "national": 25, "trend": "better"},
                "mrsa_rate": {"local": 24, "national": 28, "trend": "better"},
                "esbl_rate": {"local": 32, "national": 35, "trend": "better"}
            },
            "priority_pathogens": [
                {"organism": "Carbapenem-resistant Enterobacteriaceae", "risk_level": "critical", "cases": 3},
                {"organism": "ESBL-producing K. pneumoniae", "risk_level": "high", "cases": 18},
                {"organism": "MRSA", "risk_level": "high", "cases": 12}
            ],
            "recommendations": [
                "Continue surveillance for CRE - low incidence but increasing regionally",
                "Implement antibiotic restriction for carbapenems",
                "Enhance hand hygiene compliance to reduce MRSA transmission",
                "Consider empirical therapy changes based on local resistance data"
            ]
        }
        
        return patterns
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error fetching regional patterns: {str(e)}")
