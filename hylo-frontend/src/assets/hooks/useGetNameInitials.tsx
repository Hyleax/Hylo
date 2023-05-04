export default function useGetNameInitials(name: string) {    
    
    const nameInitials = name.split(" ")
    return {firstInitial: nameInitials[0].charAt(0).toLocaleUpperCase(),
         secondInitial: nameInitials[1].charAt(0).toLocaleUpperCase()}
}