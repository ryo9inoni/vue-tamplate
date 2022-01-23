const PARALLAX = (elements) => {

	window.addEventListener("scroll", () => {

		for (let i = 0; i < elements.length; i++) {

			const offset = window.pageYOffset;
			const top = elements[i].getBoundingClientRect().top;
			const client = document.documentElement.clientHeight;
			const pos = offset + top - client;

			if (offset >= pos) elements[i].dataset.parallax = "fade-in";

		}

	});

}
export default PARALLAX;