import type { SymbolViewProps } from 'expo-symbols';
import type { Yarn } from '@/types/yarn';
import { Card } from './card';

type YarnCardProps = {
  yarn: Yarn;
  onPress: () => void;
  selected?: boolean;
  badgeIcon?: SymbolViewProps['name'];
  onBadgePress?: () => void;
};

export function YarnCard({ yarn, onPress, selected, badgeIcon, onBadgePress }: YarnCardProps) {
  return (
    <Card
      size="small"
      title={yarn.name}
      imageUri={yarn.photoUri}
      badge={badgeIcon ? undefined : `x${yarn.quantity}`}
      badgeIcon={badgeIcon}
      onBadgePress={onBadgePress}
      selected={selected}
      accessibilityLabel={`${yarn.name}, ${yarn.quantity} ${yarn.type}`}
      onPress={onPress}
    />
  );
}