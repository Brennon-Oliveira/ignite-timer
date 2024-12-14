import { useEffect, useState } from "react";
import { CountdownContainer, Separator } from "./styles";
import { differenceInSeconds } from "date-fns";

interface CountdownProps {
	activeCycle: any;
}

export function Countdown({}: CountdownProps) {
	const [amountSecondsPast, setAmountSecondsPast] = useState(0);

	const totalSeconds = activeCycle ? activeCycle.minutesAmount * 60 : 0;

	useEffect(() => {
		let interval: NodeJS.Timeout;
		if (activeCycle) {
			interval = setInterval(() => {
				const secondsDifference = differenceInSeconds(
					new Date(),
					activeCycle.startDate,
				);

				if (secondsDifference > totalSeconds) {
					setActiveCycleId(null);

					setAmountSecondsPast(totalSeconds);
					setCycles((state) =>
						state.map((cycle) => {
							if (cycle.id === activeCycleId) {
								return { ...cycle, interruptedDate: new Date() };
							}
							return cycle;
						}),
					);
				} else {
					setAmountSecondsPast(secondsDifference);
				}
			}, 1000);
		}

		return () => {
			clearInterval(interval);
		};
	}, [activeCycle, activeCycleId, totalSeconds]);

	return (
		<CountdownContainer>
			<span>{minutes[0]}</span>
			<span>{minutes[1]}</span>
			<Separator>:</Separator>
			<span>{seconds[0]}</span>
			<span>{seconds[1]}</span>
		</CountdownContainer>
	);
}
