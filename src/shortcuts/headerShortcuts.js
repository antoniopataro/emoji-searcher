function headerShortcuts(inputRef, handleQuery, changeTheme) {
  if (inputRef === null) return;

  document.addEventListener("keydown", (e) => {
    const key = e.key.toLowerCase();
    const ctrl = e.ctrlKey;

    if (ctrl && key === "s") {
      inputRef.current.focus();
      e.preventDefault();
      return;
    }

    if (key === "escape") {
      inputRef.current.blur();
      return;
    }

    if (ctrl && key === "q") {
      changeTheme();
      e.preventDefault();
      return;
    }

    if (ctrl && key === "l") {
      handleQuery("");
      e.preventDefault();
      return;
    }
  });
}

export default headerShortcuts;
