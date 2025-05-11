import React, { useEffect, useState } from 'react'
import { Text, TouchableOpacity } from 'react-native'

import { Colors, Fonts } from '@Constants'
import { TextComponent } from '@/Components'

const ResendOTPNotice = ({ onResend }: { onResend: () => void }) => {
    const [seconds, setSeconds] = useState(60)
    const [canResend, setCanResend] = useState(false)

    useEffect(() => {
        let timer: NodeJS.Timeout
        if (seconds > 0) {
            timer = setTimeout(() => setSeconds(prev => prev - 1), 1000)
        } else {
            setCanResend(true);
        }
        return () => clearTimeout(timer)
    }, [seconds])

    const handleResend = () => {
        onResend()
        setSeconds(60)
        setCanResend(false)
    }

    return canResend ? (
        <TouchableOpacity onPress={handleResend} activeOpacity={0.7}>
            <Text style={Fonts.body4}>
                {`Didn't receive the email? `}
                <TextComponent text={'Resend Code'} color={Colors.primary} style={Fonts.h4}/>
            </Text>
        </TouchableOpacity>
    ) : (
        <TextComponent
            text={`Didn't receive the email? Please check your spam folder or request a new code in ${seconds} seconds.`}
            style={Fonts.body4}
        />
    )
}

export default ResendOTPNotice
