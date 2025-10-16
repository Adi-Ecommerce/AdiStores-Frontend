import { Button } from '@/components/ui/base-button';
import {
    Menu,
    MenuContent,
    MenuGroup,
    MenuGroupLabel,
    MenuItem,
    MenuSeparator,
    MenuShortcut,
    MenuTrigger,
} from '@/components/ui/base-menu';
import { LogOut, Mail, Settings, User } from 'lucide-react';
import AuthContext from "@/context/AuthContext.jsx";
import { useContext } from "react";
export default function MenuDemo() {
    const {logout} = useContext(AuthContext)
    return (
        <Menu>
            <MenuTrigger render={<Button variant="primary">Profile Menu</Button>} />
            <MenuContent sideOffset={4} className="w-64 z-[999]">
                {/* Account Section */}
                <MenuGroup>
                    <MenuGroupLabel>My Account</MenuGroupLabel>
                    <MenuSeparator />
                    <MenuItem>
                        <User />
                        <span>Profile</span>
                        <MenuShortcut>⇧⌘P</MenuShortcut>
                    </MenuItem>
                    <MenuItem>
                        <Settings />
                        <span>Settings</span>
                        <MenuShortcut>⌘S</MenuShortcut>
                    </MenuItem>
                </MenuGroup>

                {/* Logout */}
                <MenuSeparator />
                <MenuGroup>
                    <MenuItem onClick={logout}>
                        <LogOut />
                        <span>Log Out</span>
                        <MenuShortcut>⇧⌘Q</MenuShortcut>
                    </MenuItem>
                </MenuGroup>
            </MenuContent>
        </Menu>
    );
}
