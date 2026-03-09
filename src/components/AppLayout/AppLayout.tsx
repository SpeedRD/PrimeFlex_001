
interface AppLayoutProps{
    children:React.ReactNode
}

export function AppLayout(props:AppLayoutProps) {
 return <div> {props.children} </div>;
}


