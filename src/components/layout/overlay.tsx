interface OverlayProps {
  visible: boolean;
  onClick: () => void;
}

export function Overlay({ visible, onClick }: OverlayProps) {
  if (!visible) return null;

  return (
    <div
      className="fixed inset-0 z-30 backdrop-blur-sm cursor-pointer"
      onClick={onClick}
      aria-hidden="true"
    />
  );
}