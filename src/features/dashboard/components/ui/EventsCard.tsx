// internal import
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import EventCardItem from "../shared/EventCardItem";
import { useRecoilValue } from "recoil";
import { myEventsAtom } from "../../recoil/student/dashboardAtom";
import { convertFilePathUrl } from "@/utils/convertPath";

function EventsCard() {
  const eventsInfo = useRecoilValue(myEventsAtom);

  return (
    <ScrollArea className="">
      <div className=" flex w-max space-x-4  p-4 ">
        {eventsInfo ? (
          eventsInfo.length > 0 &&
          eventsInfo.map((item) => (
            <EventCardItem
              key={item.id}
              eventTitle={item.title}
              eventDate={item.date}
              eventImg={item.avatar ? convertFilePathUrl(item.avatar) : ""}
              eventTime={item.time}
              eventType={item.type}
            />
          ))
        ) : (
          <h2 className="font-medium text-red-700">
            Opps! Now there are no event{" "}
          </h2>
        )}
      </div>
      <ScrollBar orientation="horizontal" />
    </ScrollArea>
  );
}

// export
export default EventsCard;
