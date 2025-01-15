import './footer.css'

function Footer() {
  return (
    <footer className="footer" id="footer">
      <div className="copyright">
        &copy; Copyright{' '}
        <strong>
          <span>Empresa</span>
        </strong>
        . Todos os Direitos Reservados
      </div>
      <div className="credits">
        Desenvolvido por <a href="#">Pedro E. Garcia</a>
      </div>
    </footer>
  );
}

export default Footer;