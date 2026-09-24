import { Link } from 'expo-router';
import { ScrollView, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { projects } from '@/data/projects';

export default function ProjectsScreen() {
  //split the same array into two lists with filter
  const active = projects.filter((project) => project.status === 'active');
  const finished = projects.filter((project) => project.status === 'finished');

  return (
    <SafeAreaView style={{ flex: 1 }} edges={['top']}>
      <ScrollView contentContainerStyle={{ padding: 18, gap: 24 }}>
        <Text>Logo</Text>

        <View style={{ flexDirection: 'row', gap: 8 }}>
          <Link href="/">Home</Link>
          <Text>{'>'}</Text>
          <Text>Projects</Text>
        </View>

        <View>
          <Text>Projects</Text>
          <Text>Keep track of all project’s materials and progress</Text>
        </View>

        <Text>+ New project</Text>

        <View>
          <Text>Works in progress x{active.length}</Text>
          {active.map((project) => (
            <Link key={project.id} href={`/projects/${project.id}`}>
              <Text>{project.name}</Text>
            </Link>
          ))}
        </View>

        {finished.length > 0 && (
          <View>
            <Text>Admire your works</Text>
            {finished.map((project) => (
              <Link key={project.id} href={`/projects/${project.id}`}>
                <Text>{project.name}</Text>
              </Link>
            ))}
          </View>
        )}
      </ScrollView>
    </SafeAreaView>
  );
}
