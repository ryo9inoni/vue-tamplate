const PARALLAX = (elements) => {
	const duration = 0.05;
	let positions = [];
	elements.forEach(element => {
		positions.push(element.getBoundingClientRect().top);
	});

	window.addEventListener("scroll", () => {
		for (let index = 0; index < positions.length; index++) {
			if (window.scrollY + window.innerHeight >= positions[index]) {
				let y = (window.scrollY - positions[index] + window.innerHeight) * duration;
				elements[index].style.transform = "translate3d(0, "+y+"px, 0)";
			}
		}
	});
}
export default PARALLAX;