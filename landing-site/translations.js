// Shared Translation System for Medikal Africa Website
// This file provides translation functionality across all pages

(function() {
    'use strict';

    // Translation System
    const translations = {
        en: {
            // Top bar
            login: "Login",
            // Navigation
            home: "Home",
            solutions: "Solutions",
            aiDiagnostics: "AI Diagnostics",
            amrSurveillance: "AMR Surveillance",
            patientPortal: "Patient Portal",
            features: "Features",
            resources: "Resources",
            clinicalGuidelines: "Clinical Guidelines",
            amrData: "AMR Data",
            trainingMaterials: "Training Materials",
            ourTeam: "Our Team",
            impact: "Impact",
            newsMedia: "News & Media",
            contact: "Contact",
            getStarted: "Get Started",
            getStartedFree: "Request Institutional Access",
            // Hero section
            heroBadge: "AI-Powered Healthcare Platform",
            heroTitle1: "Revolutionizing",
            heroTitle2: "African Healthcare",
            heroTitle3: "with AI",
            heroSubtitle: "Combating Antimicrobial Resistance across Africa through advanced AI technology, multilingual support, and intelligent health solutions for clinicians and patients.",
            explorePlatform: "Explore Platform",
            watchDemo: "Early Access",
            aiAccuracy: "AI Accuracy",
            languages: "Languages",
            aiSupport: "AI Support",
            clinicalSupport: "Clinical Support",
            amrTracking: "AMR Tracking",
            multilingual: "Multilingual",
            mobileReady: "Mobile Ready",
            // Features section
            featuresTitle: "AI-Powered Healthcare",
            featuresSubtitle: "Advanced artificial intelligence capabilities designed specifically for African healthcare challenges",
            featureSymptomAnalysis: "Symptom Analysis",
            featureSymptomAnalysisDesc: "Advanced AI algorithms analyze patient symptoms and medical history to provide accurate diagnostic assistance and treatment recommendations.",
            featureMultilingual: "Multilingual Support",
            featureMultilingualDesc: "Seamless communication in English and French, breaking language barriers for better healthcare accessibility across Africa.",
            featureMedicalImaging: "Medical Imaging",
            featureMedicalImagingDesc: "AI-powered image analysis for medical conditions, enabling rapid identification of health issues from clinical photographs and scans.",
            featureSmartReminders: "Smart Reminders",
            featureSmartRemindersDesc: "Intelligent medication adherence tracking with personalized reminders to ensure proper treatment compliance and better outcomes.",
            featureInstantResults: "Instant Results",
            featureInstantResultsDesc: "Real-time AI processing delivers immediate diagnostic insights and treatment recommendations, reducing critical decision time.",
            featureClinicalSupport: "Clinical Support",
            featureClinicalSupportDesc: "Evidence-based decision support for healthcare professionals, enhancing diagnostic accuracy and treatment effectiveness.",
            // Demo section
            demoTitle: "See Medikal in Action",
            demoSubtitle: "Watch how our AI-powered platform transforms healthcare delivery across Africa"
        },
        fr: {
            // Top bar
            login: "Connexion",
            // Navigation
            home: "Accueil",
            solutions: "Solutions",
            aiDiagnostics: "Diagnostics IA",
            amrSurveillance: "Surveillance RAM",
            patientPortal: "Portail Patient",
            features: "Fonctionnalités",
            resources: "Ressources",
            clinicalGuidelines: "Directives Cliniques",
            amrData: "Données RAM",
            trainingMaterials: "Matériels de Formation",
            ourTeam: "Notre Équipe",
            impact: "Impact",
            newsMedia: "Actualités & Médias",
            contact: "Contact",
            getStarted: "Commencer",
            getStartedFree: "Demander l'Accès Institutionnel",
            // Hero section
            heroBadge: "Plateforme de Soins de Santé Alimentée par l'IA",
            heroTitle1: "Révolutionner",
            heroTitle2: "les Soins de Santé Africains",
            heroTitle3: "avec l'IA",
            heroSubtitle: "Lutter contre la Résistance aux Antimicrobiens à travers l'Afrique grâce à une technologie IA avancée, un support multilingue et des solutions de santé intelligentes pour les cliniciens et les patients.",
            explorePlatform: "Explorer la Plateforme",
            watchDemo: "Accès Anticipé",
            aiAccuracy: "Précision IA",
            languages: "Langues",
            aiSupport: "Support IA",
            clinicalSupport: "Support Clinique",
            amrTracking: "Suivi RAM",
            multilingual: "Multilingue",
            mobileReady: "Compatible Mobile",
            // Features section
            featuresTitle: "Soins de Santé Alimentés par l'IA",
            featuresSubtitle: "Capacités d'intelligence artificielle avancées conçues spécifiquement pour les défis de soins de santé africains",
            featureSymptomAnalysis: "Analyse des Symptômes",
            featureSymptomAnalysisDesc: "Des algorithmes IA avancés analysent les symptômes des patients et les antécédents médicaux pour fournir une assistance diagnostique précise et des recommandations de traitement.",
            featureMultilingual: "Support Multilingue",
            featureMultilingualDesc: "Communication fluide en Anglais et en Français, éliminant les barrières linguistiques pour une meilleure accessibilité des soins de santé à travers l'Afrique.",
            featureMedicalImaging: "Imagerie Médicale",
            featureMedicalImagingDesc: "Analyse d'images alimentée par l'IA pour les conditions médicales, permettant l'identification rapide des problèmes de santé à partir de photographies cliniques et de scanners.",
            featureSmartReminders: "Rappels Intelligents",
            featureSmartRemindersDesc: "Suivi intelligent de l'observance des médicaments avec des rappels personnalisés pour assurer une conformité au traitement appropriée et de meilleurs résultats.",
            featureInstantResults: "Résultats Instantanés",
            featureInstantResultsDesc: "Le traitement IA en temps réel fournit des informations diagnostiques immédiates et des recommandations de traitement, réduisant le temps de décision critique.",
            featureClinicalSupport: "Support Clinique",
            featureClinicalSupportDesc: "Support décisionnel basé sur des preuves pour les professionnels de la santé, améliorant la précision diagnostique et l'efficacité du traitement.",
            // Demo section
            demoTitle: "Voir Medikal en Action",
            demoSubtitle: "Regardez comment notre plateforme alimentée par l'IA transforme la prestation de soins de santé en Afrique"
        }
    };

    // Translation function - Improved version
    function translatePage(lang) {
        if (!translations[lang]) return;
        
        const t = translations[lang];
        
        // Store language preference
        localStorage.setItem('preferredLanguage', lang);
        
        // Update HTML lang attribute
        if (document.documentElement) {
            document.documentElement.lang = lang;
        }
        
        // Update all elements with data-i18n attributes
        document.querySelectorAll('[data-i18n]').forEach(el => {
            const key = el.getAttribute('data-i18n');
            if (t[key] !== undefined) {
                // Preserve HTML structure if it contains child elements
                if (el.children.length > 0) {
                    const temp = document.createElement('div');
                    temp.innerHTML = t[key];
                    el.innerHTML = temp.innerHTML;
                } else {
                    el.textContent = t[key];
                }
            }
        });
        
        // Update navigation menu items
        const navLinks = document.querySelectorAll('.nav-menu a, .mobile-nav-list a');
        navLinks.forEach(link => {
            const text = link.textContent.trim();
            const firstChild = link.childNodes[0];
            if (firstChild && firstChild.nodeType === Node.TEXT_NODE) {
                if (text.includes('Home') || text.includes('Accueil')) {
                    firstChild.textContent = ' ' + t.home;
                } else if (text.includes('Solutions')) {
                    firstChild.textContent = ' ' + t.solutions;
                } else if (text.includes('Features') || text.includes('Fonctionnalités')) {
                    firstChild.textContent = ' ' + t.features;
                } else if (text.includes('Resources') || text.includes('Ressources')) {
                    firstChild.textContent = ' ' + t.resources;
                } else if (text.includes('Our Team') || text.includes("Notre Équipe")) {
                    firstChild.textContent = ' ' + t.ourTeam;
                } else if (text.includes('Impact')) {
                    firstChild.textContent = ' ' + t.impact;
                } else if (text.includes('News & Media') || text.includes("Actualités & Médias")) {
                    firstChild.textContent = ' ' + t.newsMedia;
                } else if (text.includes('Contact')) {
                    firstChild.textContent = ' ' + t.contact;
                }
            }
        });
        
        // Update dropdown items
        document.querySelectorAll('.dropdown-item .dropdown-content, .dropdown-content a').forEach(item => {
            const text = item.textContent.trim();
            if (text.includes('AI Diagnostics') || text.includes("Diagnostics IA")) {
                item.textContent = t.aiDiagnostics;
            } else if (text.includes('AMR Surveillance') || text.includes("Surveillance RAM")) {
                item.textContent = t.amrSurveillance;
            } else if (text.includes('Patient Portal') || text.includes("Portail Patient")) {
                item.textContent = t.patientPortal;
            } else if (text.includes('Clinical Guidelines') || text.includes("Directives Cliniques")) {
                item.textContent = t.clinicalGuidelines;
            } else if (text.includes('AMR Data') || text.includes("Données RAM")) {
                item.textContent = t.amrData;
            } else if (text.includes('Training Materials') || text.includes("Matériels de Formation")) {
                item.textContent = t.trainingMaterials;
            }
        });
        
        // Update CTA buttons
        document.querySelectorAll('.cta-button, .btn-primary, .btn-secondary, .features-btn-primary, .features-btn-secondary').forEach(btn => {
            const text = btn.textContent.trim();
            const span = btn.querySelector('span[data-i18n]');
            if (span) {
                // Already handled by data-i18n
                return;
            }
            if (text.includes('Get Started') && !text.includes('Free')) {
                const icon = btn.querySelector('i');
                btn.innerHTML = (icon ? icon.outerHTML + ' ' : '') + t.getStarted;
            } else if (text.includes('Request Institutional Access') || text.includes("Demander l'Accès Institutionnel")) {
                btn.textContent = t.getStartedFree;
            } else if (text.includes('Explore Platform') || text.includes("Explorer la Plateforme")) {
                const icon = btn.querySelector('i');
                btn.innerHTML = (icon ? icon.outerHTML + ' ' : '') + t.explorePlatform;
            } else if (text.includes('Early Access') || text.includes("Accès Anticipé") || text.includes('Watch Demo') || text.includes("Regarder la Démo")) {
                btn.textContent = t.watchDemo;
            }
        });
        
        // Update stats labels
        document.querySelectorAll('.features-stat-label, .stat-label').forEach(label => {
            const text = label.textContent.trim();
            if (text.includes('AI Accuracy') || text.includes("Précision IA")) {
                label.textContent = t.aiAccuracy;
            } else if (text.includes('Languages') || text.includes('Langues')) {
                label.textContent = t.languages;
            } else if (text.includes('AI Support') || text.includes("Support IA")) {
                label.textContent = t.aiSupport;
            }
        });
        
        // Update visual features
        document.querySelectorAll('.visual-feature-text').forEach(feature => {
            const text = feature.textContent.trim();
            if (text.includes('Clinical Support') || text.includes("Support Clinique")) {
                feature.textContent = t.clinicalSupport;
            } else if (text.includes('AMR Tracking') || text.includes("Suivi RAM")) {
                feature.textContent = t.amrTracking;
            } else if (text.includes('Multilingual') || text.includes("Multilingue")) {
                feature.textContent = t.multilingual;
            } else if (text.includes('Mobile Ready') || text.includes("Compatible Mobile")) {
                feature.textContent = t.mobileReady;
            }
        });
    }

    // Initialize language selector - wrapped in DOMContentLoaded
    function initTranslations() {
        const languageSelector = document.querySelector('.language-selector');
        if (languageSelector) {
            // Load saved language preference or detect from URL
            const urlParams = new URLSearchParams(window.location.search);
            const urlLang = urlParams.get('lang');
            const savedLang = urlLang || localStorage.getItem('preferredLanguage') || 'en';
            
            // Set the selector value
            languageSelector.value = savedLang;
            
            // Translate the page
            translatePage(savedLang);
            
            // Add event listener for language change
            languageSelector.addEventListener('change', function(e) {
                translatePage(e.target.value);
                // Optional: Update URL without reload
                const url = new URL(window.location);
                url.searchParams.set('lang', e.target.value);
                window.history.pushState({}, '', url);
            });
        }
    }

    // Initialize when DOM is ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initTranslations);
    } else {
        // DOM is already ready
        initTranslations();
    }

    // Export for use in other scripts if needed
    window.MedikalTranslations = {
        translate: translatePage,
        translations: translations
    };
})();
