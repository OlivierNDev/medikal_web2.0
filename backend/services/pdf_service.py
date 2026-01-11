"""
PDF Export Service for Patient Records
Generates comprehensive PDF reports for patient information and visit history
"""

from reportlab.lib.pagesizes import letter, A4
from reportlab.lib.styles import getSampleStyleSheet, ParagraphStyle
from reportlab.lib.units import inch
from reportlab.lib import colors
from reportlab.platypus import SimpleDocTemplate, Paragraph, Spacer, Table, TableStyle, Image
from reportlab.platypus.tableofcontents import TableOfContents
from datetime import datetime
from io import BytesIO
import logging

logger = logging.getLogger(__name__)

class PatientPDFGenerator:
    """Generate PDF reports for patient records"""
    
    def __init__(self):
        self.styles = getSampleStyleSheet()
        self._create_custom_styles()
    
    def _create_custom_styles(self):
        """Create custom paragraph styles for the PDF"""
        # Title style
        self.title_style = ParagraphStyle(
            'CustomTitle',
            parent=self.styles['Heading1'],
            fontSize=20,
            spaceAfter=30,
            textColor=colors.HexColor('#7C3AED'),  # Purple color
            alignment=1  # Center alignment
        )
        
        # Subtitle style
        self.subtitle_style = ParagraphStyle(
            'CustomSubtitle',
            parent=self.styles['Heading2'],
            fontSize=14,
            spaceBefore=20,
            spaceAfter=10,
            textColor=colors.HexColor('#4B5563'),  # Gray color
        )
        
        # Normal text with spacing
        self.body_style = ParagraphStyle(
            'CustomBody',
            parent=self.styles['Normal'],
            fontSize=10,
            spaceBefore=6,
            spaceAfter=6,
        )
        
        # Small text for metadata
        self.meta_style = ParagraphStyle(
            'MetaData',
            parent=self.styles['Normal'],
            fontSize=8,
            textColor=colors.HexColor('#6B7280'),  # Light gray
        )

    def generate_patient_report(self, patient_data, visits=None, include_visits=True, include_lab_results=True):
        """
        Generate a comprehensive PDF report for a patient
        
        Args:
            patient_data: Patient information dictionary
            visits: List of patient visits
            include_visits: Whether to include visit history
            include_lab_results: Whether to include lab results
            
        Returns:
            BytesIO: PDF file as bytes
        """
        buffer = BytesIO()
        doc = SimpleDocTemplate(buffer, pagesize=A4, rightMargin=72, leftMargin=72,
                               topMargin=72, bottomMargin=18)
        
        # Container for the 'Flowable' objects
        elements = []
        
        # Add header
        elements.extend(self._create_header())
        
        # Add patient information
        elements.extend(self._create_patient_info_section(patient_data))
        
        # Add visit history if requested
        if include_visits and visits:
            elements.extend(self._create_visits_section(visits, include_lab_results))
        
        # Add footer
        elements.extend(self._create_footer())
        
        # Build PDF
        try:
            doc.build(elements)
            buffer.seek(0)
            return buffer
        except Exception as e:
            logger.error(f"Error generating PDF: {str(e)}")
            raise

    def _create_header(self):
        """Create PDF header with Medikal branding"""
        elements = []
        
        # Main title
        title = Paragraph("Medikal Healthcare System", self.title_style)
        elements.append(title)
        
        subtitle = Paragraph("Patient Medical Record", self.subtitle_style)
        elements.append(subtitle)
        
        # Generated timestamp
        timestamp = datetime.utcnow().strftime("%B %d, %Y at %I:%M %p UTC")
        timestamp_p = Paragraph(f"Generated on: {timestamp}", self.meta_style)
        elements.append(timestamp_p)
        
        elements.append(Spacer(1, 20))
        
        return elements

    def _create_patient_info_section(self, patient_data):
        """Create patient information section"""
        elements = []
        
        # Section title
        section_title = Paragraph("Patient Information", self.subtitle_style)
        elements.append(section_title)
        
        # Patient details table
        patient_info = [
            ['Full Name:', patient_data.get('full_name', 'N/A')],
            ['Age:', f"{patient_data.get('age', 'N/A')} years"],
            ['Gender:', patient_data.get('gender', 'N/A')],
            ['National ID:', patient_data.get('national_id', 'N/A')],
            ['Phone:', patient_data.get('contact_phone', 'N/A')],
            ['Address:', patient_data.get('address', 'N/A')],
            ['Insurance Number:', patient_data.get('insurance_number', 'N/A')],
            ['Language Preference:', 'English' if patient_data.get('language_preference') == 'en' else 'Kinyarwanda'],
        ]
        
        # Add emergency contact if available
        if patient_data.get('emergency_contact_name'):
            patient_info.extend([
                ['Emergency Contact:', patient_data.get('emergency_contact_name', 'N/A')],
                ['Emergency Phone:', patient_data.get('emergency_contact_phone', 'N/A')]
            ])
        
        # Create table
        patient_table = Table(patient_info, colWidths=[2*inch, 4*inch])
        patient_table.setStyle(TableStyle([
            ('BACKGROUND', (0, 0), (0, -1), colors.HexColor('#F3F4F6')),
            ('TEXTCOLOR', (0, 0), (0, -1), colors.HexColor('#374151')),
            ('ALIGN', (0, 0), (-1, -1), 'LEFT'),
            ('FONTNAME', (0, 0), (0, -1), 'Helvetica-Bold'),
            ('FONTNAME', (1, 0), (1, -1), 'Helvetica'),
            ('FONTSIZE', (0, 0), (-1, -1), 10),
            ('GRID', (0, 0), (-1, -1), 1, colors.HexColor('#E5E7EB')),
            ('LEFTPADDING', (0, 0), (-1, -1), 8),
            ('RIGHTPADDING', (0, 0), (-1, -1), 8),
            ('TOPPADDING', (0, 0), (-1, -1), 6),
            ('BOTTOMPADDING', (0, 0), (-1, -1), 6),
        ]))
        
        elements.append(patient_table)
        elements.append(Spacer(1, 20))
        
        # Medical conditions section
        if patient_data.get('allergies') or patient_data.get('chronic_conditions'):
            conditions_title = Paragraph("Medical Conditions", self.subtitle_style)
            elements.append(conditions_title)
            
            conditions_info = []
            if patient_data.get('allergies'):
                conditions_info.append(['Allergies:', patient_data.get('allergies')])
            if patient_data.get('chronic_conditions'):
                conditions_info.append(['Chronic Conditions:', patient_data.get('chronic_conditions')])
            
            conditions_table = Table(conditions_info, colWidths=[2*inch, 4*inch])
            conditions_table.setStyle(TableStyle([
                ('BACKGROUND', (0, 0), (0, -1), colors.HexColor('#FEF2F2')),
                ('TEXTCOLOR', (0, 0), (0, -1), colors.HexColor('#DC2626')),
                ('ALIGN', (0, 0), (-1, -1), 'LEFT'),
                ('FONTNAME', (0, 0), (0, -1), 'Helvetica-Bold'),
                ('FONTNAME', (1, 0), (1, -1), 'Helvetica'),
                ('FONTSIZE', (0, 0), (-1, -1), 10),
                ('GRID', (0, 0), (-1, -1), 1, colors.HexColor('#FECACA')),
                ('LEFTPADDING', (0, 0), (-1, -1), 8),
                ('RIGHTPADDING', (0, 0), (-1, -1), 8),
                ('TOPPADDING', (0, 0), (-1, -1), 6),
                ('BOTTOMPADDING', (0, 0), (-1, -1), 6),
                ('VALIGN', (0, 0), (-1, -1), 'TOP'),
            ]))
            
            elements.append(conditions_table)
            elements.append(Spacer(1, 20))
        
        return elements

    def _create_visits_section(self, visits, include_lab_results=True):
        """Create visit history section"""
        elements = []
        
        if not visits:
            return elements
        
        # Section title
        section_title = Paragraph(f"Visit History ({len(visits)} visits)", self.subtitle_style)
        elements.append(section_title)
        
        for i, visit in enumerate(visits):
            # Visit header
            visit_date = visit.get('visit_date')
            if visit_date:
                if isinstance(visit_date, str):
                    try:
                        visit_date = datetime.fromisoformat(visit_date.replace('Z', '+00:00'))
                    except:
                        pass
                if hasattr(visit_date, 'strftime'):
                    visit_date_str = visit_date.strftime("%B %d, %Y at %I:%M %p")
                else:
                    visit_date_str = str(visit_date)
            else:
                visit_date_str = "Unknown date"
            
            visit_title = Paragraph(
                f"Visit #{i+1} - {visit_date_str} ({visit.get('visit_type', 'N/A')})",
                ParagraphStyle('VisitTitle', parent=self.styles['Heading3'], fontSize=12, 
                              textColor=colors.HexColor('#7C3AED'), spaceBefore=15, spaceAfter=8)
            )
            elements.append(visit_title)
            
            # Visit details
            visit_data = []
            
            if visit.get('symptoms'):
                visit_data.append(['Symptoms:', visit.get('symptoms')])
            
            if visit.get('diagnosis'):
                visit_data.append(['Diagnosis:', visit.get('diagnosis')])
            
            if visit.get('prescribed_medications'):
                medications = ', '.join(visit.get('prescribed_medications', []))
                visit_data.append(['Prescribed Medications:', medications])
            
            if visit.get('doctor_notes'):
                visit_data.append(['Doctor Notes:', visit.get('doctor_notes')])
            
            if include_lab_results and visit.get('lab_results'):
                visit_data.append(['Lab Results:', visit.get('lab_results')])
            
            if visit.get('follow_up_required'):
                follow_up_text = "Yes"
                if visit.get('follow_up_date'):
                    follow_up_date = visit.get('follow_up_date')
                    if hasattr(follow_up_date, 'strftime'):
                        follow_up_text += f" (on {follow_up_date.strftime('%B %d, %Y')})"
                visit_data.append(['Follow-up Required:', follow_up_text])
            
            if visit_data:
                visit_table = Table(visit_data, colWidths=[2*inch, 4*inch])
                visit_table.setStyle(TableStyle([
                    ('BACKGROUND', (0, 0), (0, -1), colors.HexColor('#F9FAFB')),
                    ('TEXTCOLOR', (0, 0), (0, -1), colors.HexColor('#374151')),
                    ('ALIGN', (0, 0), (-1, -1), 'LEFT'),
                    ('FONTNAME', (0, 0), (0, -1), 'Helvetica-Bold'),
                    ('FONTNAME', (1, 0), (1, -1), 'Helvetica'),
                    ('FONTSIZE', (0, 0), (-1, -1), 9),
                    ('GRID', (0, 0), (-1, -1), 0.5, colors.HexColor('#E5E7EB')),
                    ('LEFTPADDING', (0, 0), (-1, -1), 6),
                    ('RIGHTPADDING', (0, 0), (-1, -1), 6),
                    ('TOPPADDING', (0, 0), (-1, -1), 4),
                    ('BOTTOMPADDING', (0, 0), (-1, -1), 4),
                    ('VALIGN', (0, 0), (-1, -1), 'TOP'),
                ]))
                
                elements.append(visit_table)
                elements.append(Spacer(1, 12))
        
        return elements

    def _create_footer(self):
        """Create PDF footer"""
        elements = []
        
        elements.append(Spacer(1, 30))
        
        # Disclaimer
        disclaimer = Paragraph(
            "<b>MEDICAL RECORD DISCLAIMER:</b> This document contains confidential patient information and is intended solely for authorized healthcare professionals. "
            "The information contained herein should be used in conjunction with clinical judgment and other diagnostic tools. "
            "Medikal Healthcare System is not responsible for clinical decisions made based solely on this report.",
            ParagraphStyle('Disclaimer', parent=self.styles['Normal'], fontSize=8, 
                          textColor=colors.HexColor('#6B7280'), spaceBefore=10, spaceAfter=10)
        )
        elements.append(disclaimer)
        
        # Footer text
        footer = Paragraph(
            "© 2024 Medikal Healthcare System - AI-Powered Healthcare for Africa",
            ParagraphStyle('Footer', parent=self.styles['Normal'], fontSize=8, 
                          textColor=colors.HexColor('#9CA3AF'), alignment=1)
        )
        elements.append(footer)
        
        return elements