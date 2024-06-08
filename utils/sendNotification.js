export default async function notify(to, type, content, base) {
  console.log(to, type, content, base);
  fetch(`${base}/notification/create`, {
    method: "POST",
    headers: {
      "content-type": "application/json",
      authorization: "Bearer " + localStorage.getItem("token"),
    },
    body: JSON.stringify({
      to,
      content, 
      type
    }),
  })
    .then((res) => res.json())
    .then((data) => {
      if (data.error) {
        console.log(data.error);
      } else {
        console.log(data.message);
      }
    });
}
