import { ReturnStatement } from '@angular/compiler'
import FactoryService from '../services/FactoryService'

export const MOBILE_SCREEN_SIZE = 973
export const DESKTOP = "desktop"
export const MOBILE = "mobile"

/**
 * Window resize event - not limited to explicit use by event listeners
 * @param evt -- The event listner if this function is being utilized as a callback for the window resize event
 * @param isMobile 
 * @param isDesktop 
 * @param devScale 
 */
export default function windowResize(evt=null, isMobile=false, isDesktop=false, fService : FactoryService = null) {

    // Return if the devScale isn't hasn't changed
    if (
        (fService.currentDeviceScale == MOBILE && window.innerWidth <= MOBILE_SCREEN_SIZE) ||
        (fService.currentDeviceScale == DESKTOP && window.innerWidth > MOBILE_SCREEN_SIZE)
        )
    {
        return
    }

    if (window.innerWidth > MOBILE_SCREEN_SIZE) {
        isMobile = false
        isDesktop = true
        fService.currentDeviceScale = DESKTOP

    } else if (window.innerWidth <= MOBILE_SCREEN_SIZE) {
        isMobile = true
        isDesktop = false
        fService.currentDeviceScale = MOBILE

    }
    console.log("SWITCHED: " + isMobile + ", " + isDesktop)
    return <any> {
        mobile: isMobile, 
        desktop: isDesktop
    }

}