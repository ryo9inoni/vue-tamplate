const PARALLAX = (elements) => {
	const process = () => {
		for (let index = 0; index < elements.length; index++) {
			const offset = window.pageYOffset;
			const top = elements[index].getBoundingClientRect().top;
			const height = window.innerHeight;
			const position = offset + top - height;
			const duration = 0.05;
			if (offset >= position){
				let y = (offset - position) * duration;
				elements[index].style.transform = "translate3d(0, "+y+"px, 0)";
			}
		}
	}
	window.addEventListener("load", process);
	window.addEventListener("scroll", process);
}
export default PARALLAX;