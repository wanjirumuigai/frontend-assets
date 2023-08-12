export default function markForDisposal({
  selectedIds
  }) {
  const token = JSON.parse(sessionStorage.getItem("user")).jwt;
  const value = {
  marked_for_disposal: true
  };
    selectedIds.forEach((id) => {
      fetch(`http://localhost:4000/assets/${id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(value),
      }).then((res) => {
        if (res.ok) {
          res.json().then(() => {
            
          });
        }
      });
    });
  }