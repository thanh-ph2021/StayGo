export interface FilterOptions {
  city: string
  instantBook: boolean
  facilities: string[]
  rating: number
  priceRange: number[]
  guests: {adults: number, children: number}
}

export interface FilterViewProps {
  onApply: (filters: FilterOptions) => void
}

export interface GuestSelectorModalProps {
    visible: boolean
    onClose: () => void
    onConfirm: (adults: number, children: number) => void
}