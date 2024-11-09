import Header from "@/components/header";

export default function Contact(){
    return(

            <div>
                <main className="min-h-screen bg-background pt-32">
                    <div className="bg-gradient-to-r from-primary via-secondary to-header py-4 mx-24 my-20 rounded-xl border-header border-0">
                        <div className="flex flex-row space-x-4">
                        <h1 style={{fontSize:"50px"}} className="text-3xl flex flex-row mx-6 my-6 text-background">We're to help you if you need!</h1>
                        <img src="https://www.freeiconspng.com/thumbs/phone-icon/contact-methods-phone-icon-512x512-pixel-3.png"
                        className="flex flex-row mx-[50rem] h-20 w-20"  ></img> 
                        </div>
                        <p className="font-semibold text-2xl my-4 mx-6  text-background">Write us an email or call us</p>
                        <p className="font-semibold text-2xl my-4 mx-6  text-background">Email: contact@socialsync.com</p>
                        <p className="font-semibold text-2xl my-4 mx-6  text-background">Phone number: 0752002002</p>
                        <a href="https://www.google.com/map/place/McDonald's/@45.7874917,21.238104,16.04z/data=!4m6!3m5!1s0x474567a8fb184d0f:0x90b5da871675e4a5!8m2!3d45.7864125!4d21.2374908!16s%2Fg%2F11t4_cw70c?entry=ttu&g_ep=EgoyMDI0MTEwNi4wIKXMDSoASAFQAw%3D%3D" 
                        className="font-semibold text-2xl my-4 mx-6  text-background">Location</a>
                        <link rel="stylesheet" href="https://www.google.com/map/place/McDonald's/@45.7874917,21.238104,16.04z/data=!4m6!3m5!1s0x474567a8fb184d0f:0x90b5da871675e4a5!8m2!3d45.7864125!4d21.2374908!16s%2Fg%2F11t4_cw70c?entry=ttu&g_ep=EgoyMDI0MTEwNi4wIKXMDSoASAFQAw%3D%3D" />
                    </div>          
            </main>
            </div>
    )

}