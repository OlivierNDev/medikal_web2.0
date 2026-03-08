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
            heroBadge: "Clinical Intelligence Infrastructure",
            heroTitle1: "Clinical Intelligence Infrastructure",
            heroTitle2: "for Antibiotic Stewardship",
            heroTitle3: "and AMR Monitoring",
            heroSubtitle: "Medikal supports hospitals and health systems with structured data integration, decision-support analytics, and antimicrobial resistance visibility.",
            explorePlatform: "Learn More",
            watchDemo: "Request Institutional Access",
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
            heroBadge: "Infrastructure d'Intelligence Clinique",
            heroTitle1: "Infrastructure d'Intelligence Clinique",
            heroTitle2: "pour la Gestion des Antibiotiques",
            heroTitle3: "et la Surveillance de la RAM",
            heroSubtitle: "Medikal soutient les hôpitaux et les systèmes de santé avec l'intégration de données structurées, des analyses d'aide à la décision et la visibilité de la résistance aux antimicrobiens.",
            explorePlatform: "En Savoir Plus",
            watchDemo: "Demander l'Accès Institutionnel",
            aiAccuracy: "Déploiement",
            languages: "Langues",
            aiSupport: "Disponibilité du Système",
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
            // Handle links with icons (dropdown parents)
            if (link.querySelector('i') || link.closest('.nav-item-dropdown') || link.closest('.mobile-nav-dropdown')) {
                const linkText = link.childNodes[0];
                if (linkText && linkText.nodeType === Node.TEXT_NODE) {
                    const trimmed = linkText.textContent.trim();
                    if (trimmed.includes('Home') || trimmed.includes('Accueil')) {
                        linkText.textContent = t.home;
                    } else if (trimmed.includes('Solutions')) {
                        linkText.textContent = t.solutions;
                    } else if (trimmed.includes('Features') || trimmed.includes('Fonctionnalités')) {
                        linkText.textContent = t.features;
                    } else if (trimmed.includes('Resources') || trimmed.includes('Ressources')) {
                        linkText.textContent = t.resources;
                    } else if (trimmed.includes('Our Team') || trimmed.includes("Notre Équipe")) {
                        linkText.textContent = t.ourTeam;
                    } else if (trimmed.includes('Impact')) {
                        linkText.textContent = t.impact;
                    } else if (trimmed.includes('News') || trimmed.includes("Actualités")) {
                        linkText.textContent = t.newsMedia;
                    } else if (trimmed.includes('Contact')) {
                        linkText.textContent = t.contact;
                    }
                }
            } else {
                // Regular links without icons
                if (text.includes('Home') || text.includes('Accueil')) {
                    link.textContent = t.home;
                } else if (text.includes('Solutions')) {
                    link.textContent = t.solutions;
                } else if (text.includes('Features') || text.includes('Fonctionnalités')) {
                    link.textContent = t.features;
                } else if (text.includes('Resources') || text.includes('Ressources')) {
                    link.textContent = t.resources;
                } else if (text.includes('Our Team') || text.includes("Notre Équipe")) {
                    link.textContent = t.ourTeam;
                } else if (text.includes('Impact')) {
                    link.textContent = t.impact;
                } else if (text.includes('News') || text.includes("Actualités")) {
                    link.textContent = t.newsMedia;
                } else if (text.includes('Contact')) {
                    link.textContent = t.contact;
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
            if (text.includes('Get Started') && !text.includes('Free') && !text.includes('Institutional')) {
                btn.textContent = t.getStarted;
            } else if (text.includes('Request Institutional Access') || text.includes("Demander l'Accès Institutionnel") || text.includes("Accès Institutionnel")) {
                btn.textContent = t.getStartedFree;
            } else if (text.includes('Learn More') || text.includes("En Savoir Plus") || text.includes('Explore Platform') || text.includes("Explorer la Plateforme")) {
                btn.textContent = t.explorePlatform;
            } else if (text.includes('Early Access') || text.includes("Accès Anticipé") || text.includes('Watch Demo') || text.includes("Regarder la Démo")) {
                btn.textContent = t.watchDemo;
            }
        });
        
        // Update stats labels
        document.querySelectorAll('.features-stat-label, .stat-label').forEach(label => {
            const text = label.textContent.trim();
            if (text.includes('Deployment') || text.includes("Déploiement")) {
                label.textContent = t.aiAccuracy;
            } else if (text.includes('Languages') || text.includes('Langues')) {
                label.textContent = t.languages;
            } else if (text.includes('System Availability') || text.includes("Disponibilité du Système") || text.includes('AI Support') || text.includes("Support IA")) {
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

    // Initialize language selector - works with dynamically loaded header
    function initTranslations() {
        // Try multiple selectors to find language selector
        const languageSelector = document.querySelector('.language-selector') || 
                                 document.getElementById('languageSelector') ||
                                 document.querySelector('#languageSelector');
        
        if (languageSelector) {
            // Load saved language preference or detect from URL
            const urlParams = new URLSearchParams(window.location.search);
            const urlLang = urlParams.get('lang');
            const savedLang = urlLang || localStorage.getItem('preferredLanguage') || localStorage.getItem('medikal-lang') || 'en';
            
            // Set the selector value
            languageSelector.value = savedLang;
            
            // Translate the page
            translatePage(savedLang);
            
            // Remove old event listeners by cloning
            const newSelector = languageSelector.cloneNode(true);
            languageSelector.parentNode.replaceChild(newSelector, languageSelector);
            
            // Add event listener for language change
            newSelector.addEventListener('change', function(e) {
                const selectedLang = e.target.value;
                translatePage(selectedLang);
                // Update URL without reload
                const url = new URL(window.location);
                url.searchParams.set('lang', selectedLang);
                window.history.pushState({}, '', url);
            });
            
            return true; // Successfully initialized
        }
        return false; // Selector not found yet
    }

    // Initialize when DOM is ready - with retry for dynamically loaded header
    function tryInitTranslations(retries = 10) {
        if (initTranslations()) {
            return; // Success
        }
        
        if (retries > 0) {
            // Retry after a delay (header might be loading)
            setTimeout(() => {
                tryInitTranslations(retries - 1);
            }, 200);
        }
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', () => {
            setTimeout(() => tryInitTranslations(), 500);
        });
    } else {
        // DOM is already ready
        setTimeout(() => tryInitTranslations(), 500);
    }

    // Export for use in other scripts if needed
    window.MedikalTranslations = {
        translate: translatePage,
        translations: translations
    };
})();
