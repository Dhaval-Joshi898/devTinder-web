const Footer = () => {
  return (
    <div className="">
      <footer className="footer sm:footer-horizontal footer-center bg-base-300 text-base-content p-4 fixed bottom-0">
        <aside>
          <p>
            Year {new Date().getFullYear()} 
          </p>
        </aside>
      </footer>
    </div>
  );
};

export default Footer;
