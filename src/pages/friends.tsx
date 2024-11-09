import AppHeader from "@/components/appHeader";


export default function Friends(){
  return (
    <div>
      <main className="min-h-screen bg-background pt-32">
            <img src="pfp_placeholder.png" 
            style={{ 
                width: '100px', height: 'auto',
                borderRadius: '50%',  
                objectFit: 'cover'    }}  >

                </img>
      </main>
    </div>
  );
}