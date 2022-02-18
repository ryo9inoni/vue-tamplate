const PARALLAX = (elements) => {
	const process = () => {
		for (let index = 0; index < elements.length; index++) {
			const offset = window.pageYOffset;
			const top = elements[index].getBoundingClientRect().top;
			const height = window.innerHeight;
			const position = offset + top - height;
			const duration = 0.05;
			if (offset >= position){
				new Promise((resolve) => {
					let y = (offset - position) * duration;
					elements[index].style.transform = "translate3d(0, "+y+"px, 0)";
					resolve();
				}).then(() => {
					if(elements[index].dataset.parallax !== "on") {
						elements[index].dataset.parallax = "on";
					}
				});
			}
		}
	}
	window.addEventListener("load", process);
	window.addEventListener("scroll", process);
}
export default PARALLAX;