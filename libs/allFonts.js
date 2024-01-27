
import { Cute_Font, Josefin_Slab, Philosopher, Poiret_One, Lato, Quicksand, Roboto} from 'next/font/google'

export const philosopher = Philosopher({
    subsets : ["latin"],
    weight : ["400"]
  })

export const cormant_infant = Cute_Font({
    subsets : ['latin'],
    weight : ["400"]
})

export const jose = Josefin_Slab({
    subsets : ['latin'],
    weight : ["500"]
})

export const poiret = Poiret_One({
    subsets : ['latin'],
    weight : ["400"]
})

export const lato = Lato({
    subsets : ['latin'],
    weight : ["400"]
})

export const quicksand = Quicksand({
    subsets : ['latin'],
    weight : ["400"]
})
  
export const roboto = Roboto({
    subsets: ["latin"],
    weight: ["400","300"],
  });