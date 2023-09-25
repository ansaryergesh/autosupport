export const handleExport = (getData, fileName) => {
  getData().then((response) => {
    const blob = new Blob([response.data], {
      type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
    });

    const url = window.URL.createObjectURL(blob);
    const link = document.createElement('a');

    link.href = url;
    link.download = fileName;
    document.body.appendChild(link);
    link.click();
    link.remove();
  });
};

// function downloadFile(blob, fileName) {
//   const url = window.URL.createObjectURL(blob);
//   const link = document.createElement('a');

//   link.href = url;
//   link.download = fileName;
//   document.body.appendChild(link);
//   link.click();
//   link.remove();
// }

// export async function downloadFileResponse(response, fileName) {
//   downloadFile(await response.blob(), fileName);
// }
