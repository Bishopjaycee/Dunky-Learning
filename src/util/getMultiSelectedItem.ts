export default function getMultiSelectedItems(
  data: any[],
  selectedItems: any[]
) {
  var arr = [];
  if (!Array.isArray(selectedItems)) return null;
  if (selectedItems.length == 1) {
    let dt = data.filter((el) => el.id == selectedItems[0])[0]?.name;
    return dt;
  }
  if (selectedItems.length > 1) {
    for (let i = 0; i < selectedItems.length; i++) {
      let dt = data.filter((el) => el.id == selectedItems[i]);
      arr.push(...dt);
    }
    return arr.map((dd) => dd.name);
  }
}
