/**
 * Groq API utility for generating website descriptions
 */

const GROQ_API_URL = 'https://api.groq.com/openai/v1/chat/completions';
const MODEL = 'llama-3.1-8b-instant';

/**
 * Load the Groq API key from config
 */
async function loadApiKey() {
    try {
        const response = await fetch('/config/local.json');
        const config = await response.json();
        return config.groq_api_key;
    } catch (error) {
        console.error('Failed to load API key:', error);
        return null;
    }
}

/**
 * Generate a concise description for a website using Groq API
 * @param {string} title - The website title
 * @param {string} url - The website URL
 * @returns {Promise<string>} - Generated description (under 11 words)
 */
export async function generateDescription(title, url) {
    try {
        const apiKey = await loadApiKey();

        if (!apiKey) {
            throw new Error('API key not found');
        }

        const prompt = `Generate a very concise description (maximum 11 words) for this website:
Title: ${title}
URL: ${url}`;

        const response = await fetch(GROQ_API_URL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${apiKey}`
            },
            body: JSON.stringify({
                model: MODEL,
                messages: [
                    {
                        role: 'user',
                        content: prompt
                    }
                ],
                temperature: 0.7,
                max_tokens: 50
            })
        });

        if (!response.ok) {
            throw new Error(`API request failed: ${response.status}`);
        }

        const data = await response.json();
        const description = data.choices[0]?.message?.content?.trim();

        if (!description) {
            throw new Error('No description generated');
        }

        return description;
    } catch (error) {
        console.error('Error generating description:', error);
        // Fallback to default description
        return 'Added by user';
    }
}
