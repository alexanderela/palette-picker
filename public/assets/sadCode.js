async function storeProjectInput(projectInput) {
	const fetchedProjects = await fetchProjects()
	const filteredProjects = fetchedProjects.filter(project => project.name === projectInput)
	return filteredProjects
}