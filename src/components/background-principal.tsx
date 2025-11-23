import bg from "../assets/AI-in-Education.jpg";

export function BackgroundPrincipal() {
    return (
        <div
            aria-hidden="true"
            style={{
                position: 'absolute',
                inset: 0,
                backgroundImage: `url(${bg})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                zIndex: -10,
                pointerEvents: 'none',
            }}
        >
            {/* overlay for legibility */}
            <div
                aria-hidden="true"
                style={{
                    position: 'absolute',
                    inset: 0,
                    backgroundColor: 'rgba(0,0,0,0.35)',
                }}
            />
        </div>
    );
}