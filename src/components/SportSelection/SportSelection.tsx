import {
  AmericanFootballIcon,
  BaseballIcon,
  Basketball01Icon,
  FootballIcon,
  IceHockeyIcon,
} from 'hugeicons-react'
import classes from './SportSelection.module.css'
import type { Sport } from '@/data' // Assuming Sport type is correctly imported
import { CustomChip } from '@/components/ui/CustomChip/CustomChip'

// Define the type for your icon mapping to improve type safety
type SportIconMapping = {
  sportId: number
  icon: React.ComponentType<React.SVGProps<SVGSVGElement>> // Type for an icon component
}

const sportIcons: Array<SportIconMapping> = [
  {
    sportId: 1,
    icon: FootballIcon,
  },
  {
    sportId: 2,
    icon: Basketball01Icon,
  },
  {
    sportId: 3,
    icon: IceHockeyIcon,
  },
  {
    sportId: 4,
    icon: BaseballIcon,
  },
  {
    sportId: 5,
    icon: AmericanFootballIcon,
  },
]

type SportSelectionProps = {
  sports: Array<Sport>
  selectedSports: Array<number>
  onSportToggle: (updatedSports: Array<number>) => void
}

export function SportSelection({
  sports,
  selectedSports,
  onSportToggle,
}: SportSelectionProps) {
  return (
    <CustomChip.Group
      value={selectedSports.map((id) => String(id))}
      onChange={(sportIds) => onSportToggle(sportIds.map((id) => Number(id)))}
    >
      <div className={classes.root}>
        {sports.map((sport) => {
          // Find the icon for the current sport
          const IconComponent = sportIcons.find(
            (item) => item.sportId === sport.id,
          )?.icon
          return (
            <CustomChip
              key={sport.id}
              value={String(sport.id)}
              leftSide={
                IconComponent ? (
                  <IconComponent strokeWidth={1.6} width={20} height={20} />
                ) : null
              }
            >
              {sport.name}
            </CustomChip>
          )
        })}
      </div>
    </CustomChip.Group>
  )
}
