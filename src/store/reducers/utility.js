export const updateObjects = (oldObject, newObject) => {
	return {
		...oldObject,
		...newObject,
	}
}
