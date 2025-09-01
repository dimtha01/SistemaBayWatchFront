import { ChartAreaInteractive } from "../ui/chat-area-interactive"
import { SectionCards } from "../ui/section-cards"



export const Dashboard = () => {
    return (
        <div className="flex flex-1 flex-col">
            <div className="@container/main flex flex-1 flex-col gap-4">
                <div className="flex flex-col gap-6 py-6 md:gap-10 md:py-10">
                    <SectionCards />
                    <div className="px-4 lg:px-6">
                        <ChartAreaInteractive />
                    </div>
                </div>
            </div>
        </div>
    )
}
