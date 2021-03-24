import FactoryService from '../services/FactoryService'

export const MOBILE_SCREEN_SIZE = 973
export const DESKTOP = "desktop"
export const MOBILE = "mobile"

/**
 * Window resize event - not explicitly limited to use only by event listeners
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

    let url = new URL(document.location.href)
    let currentQuery = url.searchParams.get("page") || "RESET"
    console.log('CURRENT QUERY: ' + currentQuery)

    if (window.innerWidth > MOBILE_SCREEN_SIZE) {
        isMobile = false
        isDesktop = true
        fService.currentDeviceScale = DESKTOP
    } else if (window.innerWidth <= MOBILE_SCREEN_SIZE) {
        isMobile = true
        isDesktop = false
        fService.currentDeviceScale = MOBILE

    }

    // "Adjust the pages elements accordingly" *wink* We've already maintained control via the URL
    window.location = window.location

    return <any> {
        mobile: isMobile, 
        desktop: isDesktop
    }

}