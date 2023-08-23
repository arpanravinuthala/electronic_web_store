import './Footer.css'
import React from 'react';

function Footer(){
    return(
        <div className='mt-4 p-5 text-white' style={{backgroundColor:"#334d84"}}>
                <div className="space">
                    <div>
                    <b>Mail Us:</b><br />
                    Gadgets Store,<br />
                    Buildings Alyssa, Begonia &<br/>
                    Clove Embassy Tech Village,<br/>
                    Outer Ring Road, Devarabeesanahalli Village,<br/>
                    Bengaluru, 560103,<br/>
                    Karnataka, India<br/>
                    </div>
                    <div>
                    <b>Registered Office Address:</b><br/>
                    Gadgets Store,<br/>
                    Outer Ring Road, Devarabeesanahalli Village,<br/>
                    Bengaluru, 560103,<br/>
                    Karnataka, India<br/>
                    CIN : U51109KA3759PTC066107<br/>
                    Telephone: 123-423467784<br/>
                    </div>
            </div>
            <br />
            <hr />
                <center><div className="row">
                    <div className="col">Australia</div>
                <div className="col">Brazil</div>  
                <div className="col">Canada</div> 
                 <div className="col">China</div>
                   <div className="col">France</div>  
                   <div className="col">Germany</div>
                   <div className="col">India</div>
                   <dic className="col">Ireland</dic>
                     <div className="col">Italy</div> 
                      <div className="col">Japan</div>  
                      <div className="col">Mexico</div>
                        <div className="col">Netherlands</div> 
                         <div className="col">Poland</div>  
                         <div className="col">Singapore</div> 
                          <div className="col">Spain</div>  
                          <div className="col">Turkey</div>  
                          <div className="col">Ukraine</div>
                              </div>
                              </center>
        </div>
    )
}

export default Footer;