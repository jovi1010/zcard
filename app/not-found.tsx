// app/not-found.tsx — shown when slug doesn't exist or card is inactive

export default function NotFound() {
  return (
    <>
      <style>{`
        body { background: #0A0A0F; color: #E8E4DC; font-family: 'Inter', system-ui, sans-serif; margin: 0; }
        .wrap {
          min-height: 100dvh;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          gap: 12px;
          padding: 32px;
          text-align: center;
        }
        h1 { font-family: 'DM Serif Display', Georgia, serif; font-size: 2.4rem; font-weight: 400; color: #fff; margin: 0; }
        p { font-size: 0.95rem; color: #7A7A8C; max-width: 280px; line-height: 1.6; }
        a {
          margin-top: 8px;
          display: inline-block;
          padding: 12px 28px;
          border-radius: 100px;
          background: #C9A84C;
          color: #0A0A0F;
          font-weight: 600;
          font-size: 0.88rem;
          text-decoration: none;
        }
      `}</style>
      <div className="wrap">
        <h1>Card not found</h1>
        <p>This ZCard doesn't exist or has been deactivated.</p>
        <a href="https://zcard.ca">Get your ZCard</a>
      </div>
    </>
  );
}
