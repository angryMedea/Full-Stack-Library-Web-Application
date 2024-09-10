import { Carousel } from "./components/Carousel"
import { ExploreTopBooks } from "./components/ExploreTopBooks"
import { Heros } from "./components/Heros"
import { LibraryServices } from "./components/LibraryServices"

export const HomePage = () => {
    return (
        // use fragment to avoid unnecessary DOM elements
        <>
            <ExploreTopBooks />
            <Carousel />
            <Heros />
            <LibraryServices />
        </>
    )
}