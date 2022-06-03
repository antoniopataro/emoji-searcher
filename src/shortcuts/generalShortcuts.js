function generalShortcuts(handleModal) {
  document.addEventListener("keydown", (e) => {
    const key = e.key.toLowerCase();

    if (key === "escape") {
      handleModal("close");
      return;
    }
  });
}

export default generalShortcuts;
