const projectDetails = {
    'p1': {
        title: 'Business Feasibility Prediction System',
        details: 'AI-powered system predicting business success, ROI & seasonality across 865 U.S. cities. Extensively leveraged Machine Learning utilizing a custom ETL pipeline spanning demographic, economic, and climate data via Census/NOAA APIs to systematically output robust financial risk assessments.',
        tech: 'Python, XGBoost, Census API, NOAA API, Feature Engineering',
        result: '87.1% XGBoost Accuracy'
    },
    'p2': {
        title: 'Premature Birth Prediction',
        details: 'Advanced Machine Learning model predicting preterm labor risk utilizing 11,000+ patient records (synthetization from 3K laboratory readings and 7K scanning reports). Applied H2O AutoML gradient boosting to generate early intervention alerts mapping directly to patient dashboards.',
        tech: 'Python, SQL, R, H2O AI Cloud, AWS',
        result: 'F1 Score: 0.87 (+29% improvement)'
    },
    'p3': {
        title: 'Behavioral Pattern Recognition',
        details: 'Analytical project driving data aggregation workflows to visualize large corpora. Developed interactive Tableau and custom D3.js dashboards to parse 20,000+ localized survey records. Pinpointed a critical 15% bump in burnout risk correlating to workweek duration, providing actionable stakeholder feedback.',
        tech: 'Tableau, SQL, R, D3.js, Python',
        result: 'Processed & mapped 20,000+ Data Points'
    }
};

function showProjectDetails(id) {
    const data = projectDetails[id];
    if (!data) return;
    
    document.getElementById('modalTitle').textContent = data.title;
    
    const content = `
        <div class="form-group full">
            <label>Project Overview</label>
            <p style="color:var(--text); line-height: 1.6; margin-bottom: 0.5rem; margin-top:0.3rem;">${data.details}</p>
        </div>
        <div class="form-group full" style="margin-top:0.5rem;">
            <label>Technologies Used</label>
            <p style="color:var(--text); font-weight:700; margin-top:0.3rem;">${data.tech}</p>
        </div>
        <div class="form-group full" style="margin-top:0.5rem;">
            <label>Key Impact</label>
            <p style="color:var(--accent2); font-weight:700; margin-top:0.3rem;">${data.result}</p>
        </div>
    `;
    
    document.getElementById('modalContent').innerHTML = content;
    
    const footer = document.querySelector('.modal-footer');
    if (id === 'p1') {
        footer.innerHTML = `
            <button class="btn outline" onclick="closeModal()">Close Details</button>
            <a href="BFPS.html" class="btn">KNOW MORE</a>
        `;
    } else if (id === 'p2') {
        footer.innerHTML = `
            <button class="btn outline" onclick="closeModal()">Close Details</button>
            <a href="ml-premature-birth.html" class="btn">KNOW MORE</a>
        `;
    } else {
        footer.innerHTML = `
            <button class="btn outline" onclick="closeModal()">Close Details</button>
        `;
    }

    document.getElementById('modalOverlay').classList.add('open');
}

function closeModal() {
    document.getElementById('modalOverlay').classList.remove('open');
}

function showToast(msg) {
    const t = document.getElementById('toast');
    t.textContent = msg; 
    t.classList.add('show');
    setTimeout(() => t.classList.remove('show'), 2500);
}

// Search and Filter functionality for Projects Table
document.addEventListener('DOMContentLoaded', () => {
    const searchInput = document.getElementById('searchInput');
    const techFilter = document.getElementById('techFilter');
    const rows = document.querySelectorAll('.project-row');

    function filterProjects() {
        const query = searchInput.value.toLowerCase();
        const tech = techFilter.value.toLowerCase();

        rows.forEach(row => {
            const rowTech = (row.getAttribute('data-tech') || '').toLowerCase();
            const textContent = row.textContent.toLowerCase();
            
            const matchesSearch = query === '' || textContent.includes(query);
            const matchesTech = tech === '' || rowTech.includes(tech);
            
            if (matchesSearch && matchesTech) {
                row.style.display = 'table-row';
            } else {
                row.style.display = 'none';
            }
        });
    }

    if (searchInput) searchInput.addEventListener('input', filterProjects);
    if (techFilter) techFilter.addEventListener('change', filterProjects);
});

// Scroll Animations Observer
document.addEventListener('DOMContentLoaded', () => {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('show');
            }
        });
    }, {
        threshold: 0.15,
        rootMargin: "0px 0px -50px 0px"
    });

    const hiddenElements = document.querySelectorAll('.scroll-anim');
    hiddenElements.forEach((el) => observer.observe(el));
});

// Contact Form AJAX Submission
if (document.getElementById('ajaxContactForm')) {
    document.getElementById('ajaxContactForm').addEventListener('submit', function(e) {
        e.preventDefault();
        const btn = this.querySelector('button[type="submit"]');
        const ogText = btn.textContent;
        btn.textContent = 'Sending...';
        
        // Change satyapraneethm@gmail.com here if you want to forward forms to a different email
        fetch("https://formsubmit.co/ajax/satyapraneethm@gmail.com", {
            method: "POST",
            headers: { 
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            body: JSON.stringify({
                name: document.getElementById('cName').value,
                email: document.getElementById('cEmail').value,
                message: document.getElementById('cMessage').value,
                _subject: "New Message from Portfolio Website!"
            })
        })
        .then(response => response.json())
        .then(data => {
            showToast('Message Sent Successfully!');
            this.reset();
            btn.textContent = ogText;
        })
        .catch(error => {
            showToast('Error sending message!');
            btn.textContent = ogText;
        });
    });
}
