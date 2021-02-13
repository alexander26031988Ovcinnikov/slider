function ge(selector) {
	return document.querySelector(selector);
}

function ce(tagName, attrs, children) {
	if (!children) {
    	children = [];
    }

	children = Array.isArray(children) ? children : [children];

	const element = document.createElement(tagName);
    
    for (const key in attrs) {
    	const value = attrs[key];
        
        element.setAttribute(key, value);
    }
    
    children.forEach(child => element.append(child));
    return element;
}

class Slider {
	constructor(params) {
    	this.container = document.querySelector(params.container);
        this.imageUrls = params.imageUrls;
        this.currentSlide = 0;
        
        this.createElements();
        this.setActiveSlide(0);
        this.start();
        
        this.container.addEventListener('mouseover', () => {
        	this.stop();
        });
        this.container.addEventListener('mouseout', () => {
        	this.start();
        });
    }

	start() {
    	this.intervalId = setInterval(() => {
        	this.rightSlide();
        }, 1000);
    }
    
    stop() {
    	clearInterval(this.intervalId);
    }

	leftSlide() {
    	const leftSlide = this.currentSlide === 0
        	? this.imageUrls.length - 1
            : this.currentSlide - 1;
            
        this.setActiveSlide(leftSlide);
    }
    
    rightSlide() {
    	const rightSlide = this.imageUrls.length - 1 === this.currentSlide
        	? 0
            : this.currentSlide + 1;
            
        this.setActiveSlide(rightSlide);
    }

	setActiveSlide(index) {
    	this.points[this.currentSlide].classList.remove('active');
    	this.images[this.currentSlide].classList.remove('active');

		this.currentSlide = index;

    	this.points[this.currentSlide].classList.add('active');
    	this.images[this.currentSlide].classList.add('active');
    }
	
	createElements() {
    	const leftIcon = ce('i', { class: 'fas fa-angle-left' });
    	this.leftButton = ce('button', { class: 'slider-control left' }, leftIcon);
        this.leftButton.addEventListener('click', () => this.leftSlide());
        
        const rightIcon = ce('i', { class: 'fas fa-angle-right' });
    	this.rightButton = ce('button', { class: 'slider-control right' }, rightIcon);
        this.rightButton.addEventListener('click', () => this.rightSlide());
        
        this.points = this.imageUrls.map((url, index) => {
        	const point = ce('div', { class: 'slider-point' });
            point.addEventListener('click', () => {
            	this.setActiveSlide(index);
            })
            return point;
        });
        const sliderPoints = ce('div', { class: 'slider-points' }, this.points);

		const sliderControls = ce('div', { class: 'slider-controls' }, [
        	this.leftButton,
            this.rightButton,
            sliderPoints,
        ]);
        
        this.images = this.imageUrls.map(url => ce('img', { src: url }));
        const sliderImages = ce('div', { class: 'slider-images' }, this.images);
        
        const slider = ce('div', { class: 'slider' }, [
        	sliderControls,
            sliderImages,
        ]);
        
        this.container.append(slider);
    }
}

const imageUrls = [
  'https://media.familyminded.com/3b/0d/3b0d80ed89394877a47899a513ca04bd.jpeg',
  'https://s3.amazonaws.com/cdn-origin-etr.akc.org/wp-content/uploads/2016/11/29092111/AdobeStock_94435211-800x600.jpeg',
  'https://media.familyminded.com/ce/39/ce39903185b44964b9db839467e92260.jpg',
];

const slider1 = new Slider({
	container: '#slider2',
	imageUrls: imageUrls
});
