import type { ComponentProps, JSX } from "react"
import { useEffect, useState } from "react"
import {
  Box,
  Button,
  Card,
  Checkbox,
  Container,
  Flex,
  Grid,
  Group,
  Input,
  Paper,
  Progress,
  SegmentedControl,
  Tabs,
  Text,
  Title,
} from "@mantine/core"
import { BarChart, LineChart, PieChart, DonutChart } from "@mantine/charts"
import type { Color } from "chroma-js"
import type { SwatchRole, SwatchIdByRole } from "./SwatchRole.ts"
import { swatchRoleLabel } from "./SwatchRole.ts"
import { Swatches } from "./Swatches.tsx"
import clsx from "clsx"
import { twMerge } from "tailwind-merge"

export type ColorPaletteItem = {
  id: string
  color: Color
  weight: number
  name: string
}

function buildSwatchIdByRole({
  palette,
  primaryColorId,
  secondaryColorId,
  tertiaryColorId,
}: PaletteVisualizerProps): SwatchIdByRole | undefined {
  if (palette.length === 0) return undefined

  const primaryItem = primaryColorId
    ? palette.find((item) => item.id === primaryColorId) || palette[0]
    : palette[0]

  const secondaryItem = secondaryColorId
    ? palette.find((item) => item.id === secondaryColorId) ||
      (palette.length > 2 ? palette[2] : primaryItem)
    : palette.length > 2
      ? palette[2]
      : primaryItem

  const tertiaryItem = tertiaryColorId
    ? palette.find((item) => item.id === tertiaryColorId) ||
      (palette.length > 3 ? palette[3] : secondaryItem)
    : palette.length > 3
      ? palette[3]
      : secondaryItem

  console.log({
    primary: primaryItem,
    secondary: secondaryItem,
    tertiary: tertiaryItem,
  })
  return {
    primary: primaryItem,
    secondary: secondaryItem,
    tertiary: tertiaryItem,
  }
}

type SwatchLegendProps = Omit<ComponentProps<"span">, "children"> & {
  role: SwatchRole
}

function SwatchLegend({
  className,
  role,
  ...props
}: SwatchLegendProps): JSX.Element {
  return (
    <span
      {...props}
      className={twMerge(
        clsx(
          "border-solid border-2 border-[#909090] rounded-sm px-1 py-1/2 mr-2 text-[var(--mantine-color-dimmed)]",
          {
            "": role !== undefined,
            "border-solid": role === "primary",
            "border-dashed": role === "secondary",
            "border-dotted": role === "tertiary",
          }
        ),
        className
      )}
    >
      {swatchRoleLabel[role]}
    </span>
  )
}

type PaletteVisualizerProps = {
  palette: ColorPaletteItem[]
  primaryColorId?: string
  secondaryColorId?: string
  tertiaryColorId?: string
}

export function PaletteVisualizer(props: PaletteVisualizerProps) {
  const [activeTab, setActiveTab] = useState<string | null>("buttons")
  const [roles, setRoles] = useState(() => buildSwatchIdByRole(props))
  useEffect(() => {
    setRoles(buildSwatchIdByRole(props))
  }, [props])

  if (!roles) {
    return (
      <Container size="xl" p="md">
        <Text>No palette to visualize</Text>
      </Container>
    )
  }

  const { palette } = props

  const primaryColor = roles.primary.color.hex()
  const secondaryColor = roles.secondary.color.hex()
  const tertiaryColor = roles.tertiary.color.hex()

  const chartData = [
    { month: "Jan", Series1: 12, Series2: 8 },
    { month: "Feb", Series1: 21, Series2: 15 },
    { month: "March", Series1: 15, Series2: 10 },
    { month: "April", Series1: 24, Series2: 18 },
    { month: "May", Series1: 17, Series2: 12 },
    { month: "June", Series1: 14, Series2: 9 },
  ]

  const lineChartData = [
    { month: "Jan", Primary: 12, Secondary: 8, Tertiary: 5 },
    { month: "Feb", Primary: 21, Secondary: 15, Tertiary: 9 },
    { month: "March", Primary: 15, Secondary: 10, Tertiary: 6 },
    { month: "April", Primary: 24, Secondary: 17, Tertiary: 10 },
    { month: "May", Primary: 17, Secondary: 12, Tertiary: 7 },
    { month: "June", Primary: 14, Secondary: 10, Tertiary: 6 },
  ]

  const pieData = palette.map((item) => ({
    name: item.name || `Group ${item.id}`,
    value: item.weight || 10 + Math.floor(Math.random() * 20),
    color: item.color.hex(),
  }))

  return (
    <Container size="xl" p="md">
      <Title order={2} mb="md">
        Palette Visualizer
      </Title>

      <Paper shadow="xs" p="md" mb="lg">
        <Text fw={500} mb="xs">
          Your Palette
        </Text>
        <Swatches roles={roles} onRolesChange={setRoles} palette={palette} />
        <Text size="sm" c="dimmed">
          Click on a swatch to change the color's role
        </Text>
        <Group className="gap-1">
          <SwatchLegend role="primary" />
          <SwatchLegend role="secondary" />
          <SwatchLegend role="tertiary" />
        </Group>
      </Paper>

      <Tabs value={activeTab} onChange={setActiveTab} mb="md">
        <Tabs.List>
          <Tabs.Tab value="buttons">Buttons</Tabs.Tab>
          <Tabs.Tab value="forms">Forms</Tabs.Tab>
          <Tabs.Tab value="cards">Cards</Tabs.Tab>
          <Tabs.Tab value="charts">Charts</Tabs.Tab>
          <Tabs.Tab value="dashboard">Dashboard</Tabs.Tab>
        </Tabs.List>
      </Tabs>

      {activeTab === "buttons" && (
        <Grid>
          <Grid.Col span={12}>
            <Title order={3} mb="md">
              Buttons
            </Title>
          </Grid.Col>
          <Grid.Col span={4}>
            <Box mb="md">
              <Text fw={500} mb="xs">
                Primary Buttons
              </Text>
              <Flex gap="md" mb="md" direction="column">
                <Button style={{ backgroundColor: primaryColor }}>
                  Main Button
                </Button>
                <Button
                  variant="outline"
                  style={{
                    backgroundColor: `${primaryColor}22`,
                    color: primaryColor,
                  }}
                >
                  Outline button
                </Button>
                <Button
                  variant="light"
                  style={{
                    backgroundColor: `${primaryColor}22`,
                    color: primaryColor,
                  }}
                >
                  Light
                </Button>
              </Flex>
            </Box>
          </Grid.Col>
          <Grid.Col span={4}>
            <Box mb="md">
              <Text fw={500} mb="xs">
                Secondary Buttons
              </Text>
              <Flex gap="md" mb="md" direction="column">
                <Button style={{ backgroundColor: secondaryColor }}>
                  Secondary Button
                </Button>
                <Button
                  variant="outline"
                  style={{ borderColor: secondaryColor, color: secondaryColor }}
                >
                  Outline button
                </Button>
                <Button
                  variant="light"
                  style={{
                    backgroundColor: `${secondaryColor}22`,
                    color: secondaryColor,
                  }}
                >
                  Light
                </Button>
              </Flex>
            </Box>
          </Grid.Col>
          <Grid.Col span={4}>
            <Box mb="md">
              <Text fw={500} mb="xs">
                Tertiary Buttons
              </Text>
              <Flex gap="md" mb="md" direction="column">
                <Button style={{ backgroundColor: tertiaryColor }}>
                  Tertiary Button
                </Button>
                <Button
                  variant="outline"
                  style={{ borderColor: tertiaryColor, color: tertiaryColor }}
                >
                  Outline button
                </Button>
                <Button
                  variant="light"
                  style={{
                    backgroundColor: `${tertiaryColor}22`,
                    color: tertiaryColor,
                  }}
                >
                  Light
                </Button>
              </Flex>
            </Box>
          </Grid.Col>
        </Grid>
      )}

      {activeTab === "forms" && (
        <Grid>
          <Grid.Col span={12}>
            <Title order={3} mb="md">
              Forms
            </Title>
          </Grid.Col>
          <Grid.Col span={6}>
            <Box mb="md">
              <Text fw={500} mb="xs">
                Input
              </Text>
              <Flex gap="md" mb="md" direction="column">
                <Input placeholder="Input standard" />
                <Input
                  placeholder="Input focus (primary)"
                  styles={{
                    input: {
                      borderColor: primaryColor,
                      boxShadow: `0 0 0 1px ${primaryColor}`,
                    },
                  }}
                />
                <Input
                  placeholder="Input focus (secondary)"
                  styles={{
                    input: {
                      borderColor: secondaryColor,
                      boxShadow: `0 0 0 1px ${secondaryColor}`,
                    },
                  }}
                />
                <Input placeholder="Input disabled" disabled />
                <Input.Wrapper
                  label="With (primary)"
                  styles={{ label: { color: primaryColor } }}
                >
                  <Input placeholder="Input with label" />
                </Input.Wrapper>
                <Input.Wrapper
                  label="With label (secondary)"
                  styles={{ label: { color: secondaryColor } }}
                >
                  <Input placeholder="Input with label" />
                </Input.Wrapper>
              </Flex>
            </Box>
          </Grid.Col>
          <Grid.Col span={6}>
            <Box mb="md">
              <Text fw={500} mb="xs">
                Control Elements
              </Text>
              <Flex gap="lg" mb="md" direction="column">
                <Checkbox
                  label="Primary Color"
                  checked
                  styles={{
                    input: {
                      backgroundColor: primaryColor,
                      borderColor: primaryColor,
                    },
                  }}
                />
                <Checkbox
                  label="Secondary Color"
                  checked
                  styles={{
                    input: {
                      backgroundColor: secondaryColor,
                      borderColor: secondaryColor,
                    },
                  }}
                />
                <Checkbox
                  label="Tertiary Color"
                  checked
                  styles={{
                    input: {
                      backgroundColor: tertiaryColor,
                      borderColor: tertiaryColor,
                    },
                  }}
                />
                <SegmentedControl
                  data={[
                    { value: "day", label: "Day" },
                    { value: "week", label: "Week" },
                    { value: "month", label: "Month" },
                  ]}
                  styles={{
                    root: {
                      borderColor: primaryColor,
                    },
                    indicator: {
                      backgroundColor: primaryColor,
                    },
                    label: {
                      color: "inherit",
                    },
                    control: {
                      borderColor: primaryColor,
                      "&[data-active]": {
                        color: "white",
                      },
                    },
                  }}
                />
                <Box className="mb-xs">
                  <Text size="xs" mb="xs">
                    Primary Progress
                  </Text>
                  <Progress value={65} color={primaryColor} />
                </Box>
                <Box className="mb-xs">
                  <Text size="xs" mb="xs">
                    Secondary Progress
                  </Text>
                  <Progress value={45} color={secondaryColor} />
                </Box>
                <Box className="mb-xs">
                  <Text size="xs" mb="xs">
                    Multi-color Progress
                  </Text>
                  <Progress.Root>
                    <Progress.Section value={30} color={primaryColor} />
                    <Progress.Section value={25} color={secondaryColor} />
                    <Progress.Section value={20} color={tertiaryColor} />
                  </Progress.Root>
                </Box>
              </Flex>
            </Box>
          </Grid.Col>
        </Grid>
      )}

      {activeTab === "cards" && (
        <Grid>
          <Grid.Col span={12}>
            <Title order={3} mb="md">
              Cards
            </Title>
          </Grid.Col>
          <Grid.Col span={4}>
            <Card
              shadow="sm"
              p="lg"
              radius="md"
              withBorder
              mb="md"
              style={{ borderTop: `4px solid ${primaryColor}` }}
            >
              <Text fw={500}>Primary Card</Text>
              <Text size="sm" color="dimmed" mt="xs">
                This card uses the primary color for its top border.
              </Text>
              <Button
                variant="light"
                mt="md"
                style={{
                  backgroundColor: `${primaryColor}22`,
                  color: primaryColor,
                }}
              >
                See more +
              </Button>
            </Card>
          </Grid.Col>
          <Grid.Col span={4}>
            <Card
              shadow="sm"
              p="lg"
              radius="md"
              withBorder
              mb="md"
              style={{ borderTop: `4px solid ${secondaryColor}` }}
            >
              <Text fw={500} style={{ color: secondaryColor }}>
                Secondary Card
              </Text>
              <Text size="sm" color="dimmed" mt="xs">
                This card uses the secondary color for its title and border.
              </Text>
              <Button mt="md" style={{ backgroundColor: secondaryColor }}>
                Main action
              </Button>
            </Card>
          </Grid.Col>
          <Grid.Col span={4}>
            <Card
              shadow="sm"
              p="lg"
              radius="md"
              withBorder
              mb="md"
              style={{ backgroundColor: `${tertiaryColor}11` }}
            >
              <Text fw={500}>Tertiary Card</Text>
              <Text size="sm" color="dimmed" mt="xs">
                This card uses a very light version of the tertiary color as its
                background.
              </Text>
              <Flex gap="sm" mt="md">
                <Button
                  variant="outline"
                  style={{ borderColor: primaryColor, color: primaryColor }}
                >
                  Cancel
                </Button>
                <Button style={{ backgroundColor: tertiaryColor }}>
                  Confirm
                </Button>
              </Flex>
            </Card>
          </Grid.Col>
        </Grid>
      )}

      {activeTab === "charts" && (
        <Grid>
          <Grid.Col span={12}>
            <Title order={3} mb="md">
              Charts
            </Title>
          </Grid.Col>
          <Grid.Col span={6}>
            <Paper p="md" shadow="xs" mb="md">
              <Text fw={500} mb="xs">
                Bar Chart
              </Text>
              <BarChart
                h={300}
                data={chartData}
                dataKey="month"
                series={[
                  { name: "Series1", color: primaryColor },
                  { name: "Series2", color: secondaryColor },
                ]}
                tickLine="y"
                withLegend
              />
            </Paper>
          </Grid.Col>
          <Grid.Col span={6}>
            <Paper p="md" shadow="xs" mb="md">
              <Text fw={500} mb="xs">
                Line Chart
              </Text>
              <LineChart
                h={300}
                data={lineChartData}
                dataKey="month"
                series={[
                  { name: "Primary", color: primaryColor },
                  { name: "Secondary", color: secondaryColor },
                  { name: "Tertiary", color: tertiaryColor },
                ]}
                curveType="linear"
                withLegend
              />
            </Paper>
          </Grid.Col>
          <Grid.Col span={6}>
            <Paper p="md" shadow="xs" mb="md">
              <Text fw={500} mb="xs">
                Pie Chart
              </Text>
              <PieChart
                h={300}
                data={[
                  { name: "Primary", value: 40, color: primaryColor },
                  { name: "Secondary", value: 30, color: secondaryColor },
                  { name: "Tertiary", value: 20, color: tertiaryColor },
                  ...pieData.slice(3),
                ]}
                withLabels
                labelsType="percent"
              />
            </Paper>
          </Grid.Col>
          <Grid.Col span={6}>
            <Paper p="md" shadow="xs" mb="md">
              <Text fw={500} mb="xs">
                Donut Chart
              </Text>
              <DonutChart
                h={300}
                data={[
                  { name: "Primary", value: 40, color: primaryColor },
                  { name: "Secondary", value: 30, color: secondaryColor },
                  { name: "Tertiary", value: 20, color: tertiaryColor },
                  ...pieData.slice(3),
                ]}
                withLabels
                labelsType="percent"
              />
            </Paper>
          </Grid.Col>
        </Grid>
      )}

      {activeTab === "dashboard" && (
        <Grid>
          <Grid.Col span={12}>
            <Title order={3} mb="md">
              Dashboard Example
            </Title>
          </Grid.Col>
          <Grid.Col span={8}>
            <Paper p="md" shadow="xs" mb="md">
              <Text fw={500} mb="xs" style={{ color: primaryColor }}>
                Sales Growth
              </Text>
              <LineChart
                h={250}
                data={lineChartData}
                dataKey="month"
                series={[
                  { name: "Primary", color: primaryColor },
                  { name: "Secondary", color: secondaryColor },
                  { name: "Tertiary", color: tertiaryColor },
                ]}
                curveType="linear"
                withLegend
              />
            </Paper>
          </Grid.Col>
          <Grid.Col span={4}>
            <Paper p="md" shadow="xs" mb="md">
              <Text fw={500} mb="xs" style={{ color: primaryColor }}>
                Distribution
              </Text>
              <DonutChart
                h={250}
                data={[
                  { name: "Primary", value: 40, color: primaryColor },
                  { name: "Secondary", value: 30, color: secondaryColor },
                  { name: "Tertiary", value: 20, color: tertiaryColor },
                  ...pieData.slice(3),
                ]}
                withLabels
                labelsType="percent"
              />
            </Paper>
          </Grid.Col>
          <Grid.Col span={4}>
            <Card
              shadow="sm"
              p="md"
              radius="md"
              withBorder
              mb="md"
              style={{ borderLeft: `4px solid ${primaryColor}` }}
            >
              <Text size="sm" color="dimmed">
                Total Revenue
              </Text>
              <Text fw={700} size="xl">
                $24,560
              </Text>
              <Text size="xs" color="green" mt="xs">
                +12.5% since last month
              </Text>
            </Card>
          </Grid.Col>
          <Grid.Col span={4}>
            <Card
              shadow="sm"
              p="md"
              radius="md"
              withBorder
              mb="md"
              style={{ borderLeft: `4px solid ${secondaryColor}` }}
            >
              <Text size="sm" color="dimmed">
                New Clients
              </Text>
              <Text fw={700} size="xl">
                346
              </Text>
              <Text size="xs" color="green" mt="xs">
                +8.2% since last month
              </Text>
            </Card>
          </Grid.Col>
          <Grid.Col span={4}>
            <Card
              shadow="sm"
              p="md"
              radius="md"
              withBorder
              mb="md"
              style={{ borderLeft: `4px solid ${tertiaryColor}` }}
            >
              <Text size="sm" color="dimmed">
                Conversion rate
              </Text>
              <Text fw={700} size="xl">
                18.4%
              </Text>
              <Text size="xs" color="red" mt="xs">
                -2.1% since last month
              </Text>
            </Card>
          </Grid.Col>
        </Grid>
      )}
    </Container>
  )
}
