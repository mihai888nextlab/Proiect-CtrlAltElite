export default function Header() {
  return (
    <header className="fixed top-0 left-0 right-0 h-[100px] bg-header">
      <nav>
        <title>Social Sync</title>
        
        <ul>
          <div style={{display:"flex",alignItems:'center'}}>
            <div style={{flexGrow: "1",color:"#FEF3E2",fontSize:"35px",fontStyle:"italic",float:"left",textAlign:'center'}}>SOCIAL SYNC</div>
          </div>
        </ul>
      </nav>
    </header>
  );
}
