import { NavItem } from "@/types/nav";
import { SidebarMenu } from "../ui/sidebar";
import NavigationItem from "./NavigationItem";

function NavigationList({ items }: { items: NavItem[] }) {
  return (
    <SidebarMenu>
      {items.map((item) => (
        <NavigationItem key={item.label} item={item} />
      ))}
    </SidebarMenu>
  );
}

export default NavigationList;
