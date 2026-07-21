// scripts/partners-data.js
// Single source of truth for EdSeva partners.
// Add/remove/edit a partner here and both index.html and
// partners.html update automatically.
//
// instagram / linkedin - shown as icon links; instagram is the
//                         default link on the logo and name.
// blurb                - optional, only used on partners.html.

window.EDSEVA_PARTNERS = [
    {
        name: "Imperial Sikh Society",
        instagram: "https://www.instagram.com/imperialsikhsoc/",
        linkedin: "https://www.linkedin.com/company/imperial-sikh-soc/",
        logo: "images/partners/Imperial Sikh Soc.webp",
        blurb: "We are supported by the Sikh Society of <b>Imperial College London</b>, ranked by QS as the 2nd best University in the world. They support us through the provision of mentors and venues for our events."
    },
    {
        name: "Cambridge Sikh Society",
        instagram: "https://www.instagram.com/cusikhsoc/",
        linkedin: "https://www.linkedin.com/company/cusikhsoc/",
        logo: "images/partners/Cambridge Sikh Soc.webp",
        blurb: "The Sikh Society of the <b>University of Cambridge</b>, one of the most well-known and renowned universities in the world. They support us through the provision of mentors and venues for our events."
    },
    {
        name: "Oxford Sikh Society",
        instagram: "https://www.instagram.com/oxfordsikhsoc/",
        linkedin: "https://www.linkedin.com/company/oxfordsikhsoc/",
        logo: "images/partners/Oxford Sikh Soc.webp",
        blurb: "The Sikh Society of the <b>University of Oxford</b>, a household name known for academic excellence and reputation. They support us through the provision of mentors and venues for our events."
    },
    {
        name: "UCL Sikh Society",
        instagram: "https://www.instagram.com/uclsikhsoc/",
        linkedin: "https://www.linkedin.com/company/ucl-sikh-society/",
        logo: "images/partners/UCL Sikh Soc.jpg",
        blurb: "The Sikh Society of <b>University College London</b>, a Global Top 10 university known for its academic excellence and diversity. They support us through the prevision of venues for events and mentors."
    },
    {
        name: "Warwick Sikh Society",
        instagram: "https://www.instagram.com/warwicksikhsoc/",
        linkedin: "https://www.linkedin.com/company/warwick-sikh-society/",
        logo: "images/partners/Warwick Sikh Soc.jpeg",
        blurb: "The Sikh Society of the <b>University of Warwick</b>, a well-established institution known for its academic rigor and vibrant student life. They support us through the provision of mentors and venues for our events."
    },
];

(function () {
    function escapeHtml(str) {
        return String(str)
            .replace(/&/g, "&amp;")
            // .replace(/</g, "&lt;")
            // .replace(/>/g, "&gt;")
            .replace(/"/g, "&quot;");
    }

    function socialIcon(url, iconClass, label) {
        if (!url) return "";
        return `
      <a href="${url}" target="_blank" rel="noopener" class="partner-social-icon" aria-label="${label}">
        <i class="${iconClass}" aria-hidden="true"></i>
      </a>
    `;
    }

    function renderPartnerCard(partner, showBlurb) {
        const safeName = escapeHtml(partner.name);
        const mainUrl = partner.instagram || partner.linkedin || "#";

        const blurbHtml = showBlurb && partner.blurb
            ? `<p>${escapeHtml(partner.blurb)}</p>`
            : "";

        const iconsHtml = `
      <div class="partner-social-row">
        ${socialIcon(partner.linkedin, "fa-brands fa-linkedin", safeName + " on LinkedIn")}
        ${socialIcon(partner.instagram, "fa-brands fa-instagram", safeName + " on Instagram")}
      </div>
    `;

        const cardClass = showBlurb ? "partner-card partner-card--stacked card" : "partner-card card";

        return `
      <div class="${cardClass}">
        <div class="partner-logo">
          <a href="${mainUrl}" target="_blank" rel="noopener" aria-label="${safeName} on Instagram">
            <img src="${partner.logo}" alt="${safeName} logo">
          </a>
        </div>
        <div class="partner-card-body">
          <h4><a href="${mainUrl}" target="_blank" rel="noopener">${safeName}</a></h4>
          ${iconsHtml}
          ${blurbHtml}
        </div>
      </div>
    `;
    }

    function renderAll() {
        const containers = document.querySelectorAll("[data-partners-list]");
        if (!containers.length) return;

        const partners = window.EDSEVA_PARTNERS || [];

        containers.forEach((container) => {
            const showBlurb = container.getAttribute("data-blurb") === "true";
            container.innerHTML = partners
                .map((p) => renderPartnerCard(p, showBlurb))
                .join("");
        });
    }

    document.addEventListener("DOMContentLoaded", renderAll);
})();