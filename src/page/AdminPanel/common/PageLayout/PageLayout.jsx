import './index.css'

function PageLayout({ title, children }) {
  return (
    <div className="Page">
      <header className="Page-header">
        <h1>{title}</h1>
      </header>
      <main className="Page-content">{children}</main>
    </div>
  );
}

export default PageLayout;
