const images = [
    { src: 'https://picsum.photos/id/1015/600/450', title: 'Mountain River', category: 'nature' },
    { src: 'https://picsum.photos/id/1018/600/450', title: 'Forest Valley', category: 'nature' },
    { src: 'https://picsum.photos/id/1043/600/450', title: 'Desert Road', category: 'nature' },
    { src: 'https://picsum.photos/id/1031/600/450', title: 'City Skyline', category: 'city' },
    { src: 'https://picsum.photos/id/1039/600/450', title: 'Night Streets', category: 'city' },
    { src: 'https://picsum.photos/id/1048/600/450', title: 'Downtown', category: 'city' },
    { src: 'https://picsum.photos/id/1005/600/450', title: 'Portrait One', category: 'people' },
    { src: 'https://picsum.photos/id/1011/600/450', title: 'Portrait Two', category: 'people' },
    { src: 'https://picsum.photos/id/1027/600/450', title: 'Group Walk', category: 'people' },
    { src: 'https://picsum.photos/id/1074/600/450', title: 'Dog in Field', category: 'animals' },
    { src: 'https://picsum.photos/id/1084/600/450', title: 'Wild Fox', category: 'animals' },
    { src: 'https://picsum.photos/id/1069/600/450', title: 'Curious Cat', category: 'animals' }
];

const gallery = document.getElementById('gallery');
const lightbox = document.getElementById('lightbox');
const lightboxImg = document.getElementById('lightboxImg');
const caption = document.getElementById('caption');
const closeBtn = document.getElementById('closeBtn');
const prevBtn = document.getElementById('prevBtn');
const nextBtn = document.getElementById('nextBtn');
const filterBtns = document.querySelectorAll('.filter-btn');

let currentIndex = 0;
let currentFilter = 'all';

function renderGallery() {
    gallery.innerHTML = '';
    images.forEach((img, index) => {
        const item = document.createElement('div');
        item.className = 'gallery-item';
        item.dataset.category = img.category;
        item.dataset.title = img.title;
        item.style.animationDelay = `${(index % 8) * 0.05}s`;
        if (currentFilter !== 'all' && img.category !== currentFilter) {
            item.classList.add('hidden');
        }
        const imageEl = document.createElement('img');
        imageEl.src = img.src;
        imageEl.alt = img.title;
        imageEl.loading = 'lazy';
        item.appendChild(imageEl);
        item.addEventListener('click', () => openLightbox(index));
        gallery.appendChild(item);
    });
}

function getVisibleIndices() {
    return images
        .map((img, i) => ({ img, i }))
        .filter(({ img }) => currentFilter === 'all' || img.category === currentFilter)
        .map(({ i }) => i);
}

function openLightbox(index) {
    currentIndex = index;
    updateLightbox();
    lightbox.classList.add('active');
}

function updateLightbox() {
    const img = images[currentIndex];
    lightboxImg.src = img.src;
    lightboxImg.alt = img.title;
    caption.textContent = img.title;
}

function closeLightbox() {
    lightbox.classList.remove('active');
}

function showNext() {
    const visible = getVisibleIndices();
    const pos = visible.indexOf(currentIndex);
    currentIndex = visible[(pos + 1) % visible.length];
    updateLightbox();
}

function showPrev() {
    const visible = getVisibleIndices();
    const pos = visible.indexOf(currentIndex);
    currentIndex = visible[(pos - 1 + visible.length) % visible.length];
    updateLightbox();
}

closeBtn.addEventListener('click', closeLightbox);
nextBtn.addEventListener('click', showNext);
prevBtn.addEventListener('click', showPrev);

lightbox.addEventListener('click', (e) => {
    if (e.target === lightbox) closeLightbox();
});

window.addEventListener('keydown', (e) => {
    if (!lightbox.classList.contains('active')) return;
    if (e.key === 'Escape') closeLightbox();
    if (e.key === 'ArrowRight') showNext();
    if (e.key === 'ArrowLeft') showPrev();
});

filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        filterBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        currentFilter = btn.dataset.category;
        renderGallery();
    });
});

renderGallery();