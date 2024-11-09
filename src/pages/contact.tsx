import Header from "@/components/header";

export default function Contact(){
    return(

            <div>
                <Header />
            <main className="min-h-screen bg-background pt-28">
                <div className="bg-gradient-to-r from-primary via-secondary to-header py-4 mx-24 my-12 rounded-xl border-header border-4">
                    <h1 style={{fontSize:"60px"}} className="text-3xl mx-28 my-6 text-background">We're to help you if you need!</h1>
                    <p className="text-3xl mx-28 my-6 text-background">Write us an email or call us</p>
                    <p className="text-3xl mx-28 my-6 text-background">Email: contact@socialsynk.com</p>
                    <p className="text-3xl mx-28 my-6 text-background">Phone number: 0752002002</p>
                    <a href="https://www.google.com/maps/place/McDonald's/@45.7874917,21.238104,16.04z/data=!4m6!3m5!1s0x474567a8fb184d0f:0x90b5da871675e4a5!8m2!3d45.7864125!4d21.2374908!16s%2Fg%2F11t4_cw70c?entry=ttu&g_ep=EgoyMDI0MTEwNi4wIKXMDSoASAFQAw%3D%3D" 
                    className="text-3xl mx-28 my-6 text-background">Location</a>
                </div>                    
                <div>
                    <img src="https://www.freeiconspng.com/thumbs/phone-icon/contact-methods-phone-icon-512x512-pixel-3.png" alt="Centered Image"
                     className="absolute top-3/4 left-1/2 transform -translate-x-1/2 -translate-y-1/2 max-w-full h-auto"  ></img>
                </div>                
            </main>
            </div>
    )

}