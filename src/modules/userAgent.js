const UA = {
	IS_IOS: (() => {
		return (window.navigator.userAgent.toLowerCase().indexOf("iphone") >= 0) || (window.navigator.userAgent.toLowerCase().indexOf("ipad") >= 0) || (window.navigator.userAgent.toLowerCase().indexOf("ipod") >= 0);
	})(),
	IS_ANDROID: (() => {
		return (window.navigator.userAgent.toLowerCase().indexOf("android") >= 0);
	})(),
	IS_IE: (() => {
		return (window.navigator.userAgent.toLowerCase().indexOf("msie") >= 0 || window.navigator.userAgent.toLowerCase().indexOf("trident") >= 0);
	})(),
};
export default UA;