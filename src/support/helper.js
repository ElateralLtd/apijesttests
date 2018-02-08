export function getMetadataItem(metadataResults, parentName, childName) {
  const locationRootRef = metadataResults.find(json => json.name === parentName).ref;
  return metadataResults.find(json => {
    return (json.name === childName && json.path.includes(locationRootRef));
  });
}
