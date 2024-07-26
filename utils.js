function cutPath(path) {
	return (path.length > 1 && path[length - 1] === "/") ? path.substring(0, path.length) : path;
}

export default cutPath;