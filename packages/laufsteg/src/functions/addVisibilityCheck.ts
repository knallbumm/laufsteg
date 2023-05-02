export const addVisibilityCheck = ({
  onVisible,
  onHidden,
}: {
  onVisible: () => void;
  onHidden: () => void;
}) => {
  document.addEventListener('visibilitychange', () => {
    if (document.hidden) {
      onHidden();
    } else {
      onVisible();
    }
  });
};
