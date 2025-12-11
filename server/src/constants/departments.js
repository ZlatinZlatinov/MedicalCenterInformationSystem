const departmentNames = [
    'Cardiology',
    'Neurology',
    'Pediatrics',
    'Orthopedics',
    'Dermatology',
    'Nephrology',
    'Ophthalmology',
    'Dentistry',
    'Psychiatry'
]; 

const specialtyNames = [
    'Cardiologist',
    'Neurologist',
    'Pediatrician',
    'Orthopedist',
    'Dermatologist',
    'Ophthalmologist',
    'Dentist',
    'Nephrologist',
    'Psychiatrist',
    'Surgeon',
    'Gastroenterologist',
    'Endocrinologist',
    'Urologist',
    'Gynecologist',
    'Oncologist',
    'Pulmonologist'
]; 

/* Grouping by Type of Care */
const specialtiesByCareType = {
    // **General Care** (Primary Care, General Medicine)
    "General Care": {
        "Family Medicine": "Family Physician",
        "Internal Medicine": "Internist",
        "Pediatrics": "Pediatrician",
        "Psychiatry": "Psychiatrist",
    },

    // **Medical Specialties** (Non-surgical, Diagnostic, and Treatment-focused)
    "Medical Specialties": {
        "Cardiology": "Cardiologist",
        "Neurology": "Neurologist",
        "Dermatology": "Dermatologist",
        "Ophthalmology": "Ophthalmologist",
        "Nephrology": "Nephrologist",
        "Gastroenterology": "Gastroenterologist",
        "Endocrinology": "Endocrinologist",
        "Pulmonology": "Pulmonologist",
        "Hematology": "Hematologist", // Optional: Blood-related specialties
        "Infectious Disease": "Infectious Disease Specialist", // Optional
    },

    // **Surgical Specialties** (Specialties involving surgery or intervention)
    "Surgical Specialties": {
        "Orthopedics": "Orthopedic Surgeon",
        "Surgery": "General Surgeon",
        "Urology": "Urologist",
        "Oncology": "Oncologist",
        "Obstetrics and Gynecology": "Gynecologist", // Including Maternity
        "Plastic Surgery": "Plastic Surgeon", // Optional: Cosmetic surgery
        "Cardiothoracic Surgery": "Cardiothoracic Surgeon", // Optional: Heart and chest surgery
        "Neurosurgery": "Neurosurgeon", // Optional: Brain and nervous system surgery
        "Vascular Surgery": "Vascular Surgeon", // Optional: Blood vessel-related surgeries
    },

    // **Women’s Health** (Specialties related to female reproductive health and care)
    "Women’s Health": {
        "Obstetrics and Gynecology": "Gynecologist",
        "Reproductive Endocrinology": "Reproductive Endocrinologist", // Optional: Fertility specialists
        "Maternal-Fetal Medicine": "Maternal-Fetal Medicine Specialist", // Optional: High-risk pregnancy specialists
        "Breast Health": "Breast Surgeon", // Optional: For breast cancer screening/treatment
    },

    // **Oral and Maxillofacial Care** (Dentistry and oral health)
    "Oral and Maxillofacial Care": {
        "Dentistry": "Dentist",
        "Oral Surgery": "Oral Surgeon",
        "Periodontics": "Periodontist", // Gum and bone-related oral care
        "Orthodontics": "Orthodontist", // Braces and alignment
        "Endodontics": "Endodontist", // Root canal specialists
    },

    // **Pediatric Care** (Specialties related to children and adolescent health)
    "Pediatric Care": {
        "Pediatrics": "Pediatrician",
        "Pediatric Neurology": "Pediatric Neurologist", // Child-focused neurologists
        "Pediatric Surgery": "Pediatric Surgeon", // Surgery for children
        "Pediatric Cardiology": "Pediatric Cardiologist", // Heart specialists for children
        "Pediatric Pulmonology": "Pediatric Pulmonologist", // Respiratory specialists for children
        "Pediatric Endocrinology": "Pediatric Endocrinologist", // Hormone-related issues in children
    },

    // **Preventive and Diagnostic Services** (Preventive care, checkups, diagnostics)
    "Preventive and Diagnostic Services": {
        "Radiology": "Radiologist", // Imaging services like X-rays, MRIs, etc.
        "Laboratory Services": "Lab Technician", // Blood work, tests, etc.
        "Physical Therapy": "Physical Therapist", // Rehabilitation and recovery
        "Preventive Medicine": "Preventive Care Physician", // Health screenings and prevention
        "Genetic Counseling": "Genetic Counselor", // Optional: For genetic disease screening
        "Vaccination Clinics": "Immunization Specialist", // Optional: For vaccines
    },

    // **Chronic Disease Management** (For long-term, ongoing care)
    "Chronic Disease Management": {
        "Endocrinology": "Endocrinologist", // Diabetes and hormone disorders
        "Nephrology": "Nephrologist", // Kidney diseases and dialysis
        "Pulmonology": "Pulmonologist", // Respiratory conditions
        "Cardiology": "Cardiologist", // Chronic heart disease
        "Rheumatology": "Rheumatologist", // Autoimmune diseases and joint disorders
        "Oncology": "Oncologist", // Cancer treatment and management
        "Gastroenterology": "Gastroenterologist", // Chronic digestive issues
    },

    // **Emergency and Urgent Care** (For immediate, urgent health needs)
    "Emergency and Urgent Care": {
        "Emergency Medicine": "Emergency Room Doctor",
        "Trauma Surgery": "Trauma Surgeon", // Optional: For serious injuries
        "Urgent Care": "Urgent Care Physician",
    }
};

module.exports = {
    departmentNames,
    specialtyNames,
    specialtiesByCareType
};